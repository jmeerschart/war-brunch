# war-brunch

Adds war/zip support to [brunch](http://brunch.io).

The plugin will zip or create war after the compilation. You can also add a folder to include like /WEB-INF etc... Delete generation after build

## Usage

Install the plugin via npm with :

```
$ npm install --save war-brunch
```

This plugin works only when optimized option is passed.

```
$ brunch build --production
```

## Config

To specify war options, use `config.plugins.war` object.

### Change JS path or CSS path

```coffeescript
config =
  plugins:
    war:
        outputFile:'fileToDeploy.war'
        pathInclude:'deploy'
```

* default

<table>
  <tr>
    <th>war.outputfile</th>
    <td>ROOT.WAR</td>
  </tr>
  <tr>
    <th>war.pathInclude</th>
    <td>undefined</td>
  </tr>
</table>

## CHANGELOG

* 1.0.0 (29 Sep 2013) - Initial release

## License

The MIT License (MIT)

Copyright (c) 2013 Julien Meerschart