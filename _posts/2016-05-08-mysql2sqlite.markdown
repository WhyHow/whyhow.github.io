---
author: YiZi
comments: true
date: 2016-05-08 12:54:00 +0800
layout: post
slug: mysql2sqlite
title: MySQL数据库导出成SQLite3
categories: [行]
tags:
-  分享
-  教程
---
不同的数据库实现中SQL的语法**稍有**区别，所以从一个实现到另一个实现直接可能需要一点功夫。MySQL数据库功能强悍，不过我发现sqlite3对我这种小运用够够的，而且还简单方便。所以就开始在网上查怎么把MySQL导出成sqlite3，发现了不少的帖子，竟然都不怎么好用，最后找到了一个好用的，推荐给大家。

这个实现起源与一个“神一般”的gist：[https://gist.github.com/bign8/9055981/05e65fd90c469c5eaa730823910c0c5f9de40ab4](https://gist.github.com/bign8/9055981/05e65fd90c469c5eaa730823910c0c5f9de40ab4)，然后那个gist被不断的更新，修订，最后终于有人受不了了，做了个项目来管理这个脚本：[https://github.com/dumblob/mysql2sqlite](https://github.com/dumblob/mysql2sqlite)。

因此，就有了这个叫做mysql2sqlite的项目，用法也很简单

    After dumping the MySQL DB somehow (e.g.

    mysqldump --skip-extended-insert --compact [options]... DB_name
    or

    mysqldump --no-data -u root -pmyPassword myDB
    ), run just

    mysql2sqlite.sh dump_mysql.sql | sqlite3 mysqlite3.db

其实代码就是一个AWK脚本，完全没有必要放到一个sh文件里，直接把内容提取出来：

{% highlight awk %}

BEGIN {
  FS=",$"
  print "PRAGMA synchronous = OFF;"
  print "PRAGMA journal_mode = MEMORY;"
  print "BEGIN TRANSACTION;"
}

# CREATE TRIGGER statements have funny commenting. Remember we are in trigger.
/^\/\*.*(CREATE.*TRIGGER|create.*trigger)/ {
  gsub( /^.*(TRIGGER|trigger)/, "CREATE TRIGGER" )
  print
  inTrigger = 1
  next
}
# The end of CREATE TRIGGER has a stray comment terminator
/(END|end) \*\/;;/ { gsub( /\*\//, "" ); print; inTrigger = 0; next }
# The rest of triggers just get passed through
inTrigger != 0 { print; next }

# CREATE VIEW looks like a TABLE in comments
/^\/\*.*(CREATE.*TABLE|create.*table)/ {
  inView = 1
  next
}
# The end of CREATE VIEW
/^(\).*(ENGINE|engine).*\*\/;)/ {
  inView = 0;
  next
}
# The rest of view just get passed through
inView != 0 { next }

# Skip other comments
/^\/\*/ { next }

# Print all `INSERT` lines. The single quotes are protected by another single quote.
( /^ *\(/ && /\) *[,;] *$/ ) || /^(INSERT|insert)/ {
  prev = "";
  gsub( /\\\047/, "\047\047" )  # single quote
  gsub( /\\\047\047,/, "\\\047," )
  gsub( /\\n/, "\n" )
  gsub( /\\r/, "\r" )
  gsub( /\\"/, "\"" )
  gsub( /\\\\/, "\\" )
  gsub( /\\\032/, "\032" )  # substitute
  # sqlite3 is limited to 16 significant digits of precision
  while ( match( $0, /0x[0-9a-fA-F]{17}/ ) ) {
    hexIssue = 1
    sub( /0x[0-9a-fA-F]+/, substr( $0, RSTART, RLENGTH-1 ), $0 )
  }
  print
  next
}

# CREATE DATABASE is not supported
/^(CREATE.*DATABASE|create.*database)/ { next }

# Print the `CREATE` line as is and capture the table name.
/^(CREATE|create)/ {
  if ( $0 ~ /IF NOT EXISTS|if not exists/ || $0 ~ /TEMPORARY|temporary/ ){
    caseIssue = 1
  }
  if ( match( $0, /`[^`]+/ ) ) {
    tableName = substr( $0, RSTART+1, RLENGTH-1 )
  }
  aInc = 0
  prev = ""
  firstInTable = 1
  print
  next
}

# Replace `FULLTEXT KEY` (probably other `XXXXX KEY`)
/^  (FULLTEXT KEY|fulltext key)/ { gsub( /.+(KEY|key)/, "  KEY" ) }

# Get rid of field lengths in KEY lines
/ (PRIMARY |primary )?(KEY|key)/ { gsub( /\([0-9]+\)/, "" ) }

aInc == 1 && /PRIMARY KEY|primary key/ { next }

# Replace COLLATE xxx_xxxx_xx statements with COLLATE BINARY
/ (COLLATE|collate) [a-z0-9_]*/ { gsub( /(COLLATE|collate) [a-z0-9_]*/, "COLLATE BINARY" ) }

# Print all fields definition lines except the `KEY` lines.
/^  / && !/^(  (KEY|key)|\);)/ {
  if ( match( $0, /[^"`]AUTO_INCREMENT|auto_increment[^"`]/)) {
    aInc = 1;
    gsub( /AUTO_INCREMENT|auto_increment/, "PRIMARY KEY AUTOINCREMENT" )
  }
  gsub( /(UNIQUE KEY|unique key) `.*` /, "UNIQUE " )
  gsub( /(CHARACTER SET|character set) [^ ]+ /, "" )
  gsub( /DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP|default current_timestamp on update current_timestamp/, "" )
  gsub( /(COLLATE|collate) [^ ]+ /, "" )
  gsub( /(ENUM|enum)[^)]+\)/, "text " )
  gsub( /(SET|set)\([^)]+\)/, "text " )
  gsub( /UNSIGNED|unsigned/, "" )
  gsub( /` [^ ]*(INT|int)[^ ]*/, "` integer" )
  # field comments are not supported
  gsub( / (COMMENT|comment).+$/, "" )
  # Get commas off end of line
  gsub( /,.?$/, "")
  if ( prev ){
    if ( firstInTable ){
      print prev
      firstInTable = 0
    }
    else print "," prev
  }
  else {
    # FIXME check if this is correct in all cases
    if ( match( $1,
        /(CONSTRAINT|constraint) \".*\" (FOREIGN KEY|foreign key)/ ) )
      print ","
  }
  prev = $1
}

/ ENGINE| engine/ {
  if (prev) {
    if (firstInTable) {
      print prev
      firstInTable = 0
    }
    else print "," prev
    # else print prev
  }
  prev=""
  print ");"
  next
}
# `KEY` lines are extracted from the `CREATE` block and stored in array for later print 
# in a separate `CREATE KEY` command. The index name is prefixed by the table name to 
# avoid a sqlite error for duplicate index name.
/^(  (KEY|key)|\);)/ {
  if (prev) {
    if (firstInTable) {
      print prev
      firstInTable = 0
    }
    else print "," prev
    # else print prev
  }
  prev = ""
  if ($0 == ");"){
    print
  } else {
    if (  match( $0, /`[^`]+/ ) ) {
      indexName = substr( $0, RSTART+1, RLENGTH-1 )
    }
    if ( match( $0, /\([^()]+/ ) ) {
      indexKey = substr( $0, RSTART+1, RLENGTH-1 )
    }
    # idx_ prefix to avoid name clashes (they really happen!)
    key[tableName]=key[tableName] "CREATE INDEX \"idx_" tableName "_" indexName "\" ON \"" tableName "\" (" indexKey ");\n"
  }
}

END {
  # print all `KEY` creation lines.
  for (table in key) printf key[table]

  print "END TRANSACTION;"

  if ( hexIssue ){
    print "WARN Hexadecimal numbers longer than 16 characters has been trimmed." | "cat >&2"
  }
  if ( caseIssue ){
    print "WARN Pure sqlite identifiers are case insensitive (even if quoted\n" \
          "     or if ASCII) and doesnt cross-check TABLE and TEMPORARY TABLE\n" \
          "     identifiers. Thus expect errors like \"table T has no column named F\"." | "cat >&2"
  }
}
{% endhighlight %}

然后按照正常的AWK脚本运行就OK啦！

不要去看网上那几个基于Python的实现，打开源码看都会发现都是将内容读入到内存再写出去，不如这个AWK来得直接，而且这个脚本不但省内存，效率也相当不错。
