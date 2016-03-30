import json
import codecs

tags = json.load(open('../../_site/indexes/bytags/tags.json'))
for tag in tags:
    outfile = codecs.open(str(tags[tag])+'.json','w','UTF-8')
    outfile.write("""---
layout: null
---
{ "posts":[{% for post in site.tags['""")
    outfile.write(tag)
    outfile.write("""'] %} 
    {% if post.url %}{"{{ post.title }}":"{{ post.url }}"}{% unless forloop.last %},{% endunless %}{% endif %}{% endfor %}
]}""")
    outfile.close()