FROM debian:9.5-slim

LABEL "com.github.actions.name"="Build Website"
LABEL "com.github.actions.description"="Builds the Github Pages"
LABEL "com.github.actions.icon"="box"
LABEL "com.github.actions.color"="purple"

LABEL "repository"="http://github.com/octocat/hello-world"
LABEL "homepage"="http://pages.github.com/laurayco/ogmmgr"
LABEL "maintainer"="Lauren Connors <laurayco@outlook.com>"

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]