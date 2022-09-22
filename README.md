# OneShot - Conception Tool

## Presentation

The purpose of this tool is to ease the creation of small code.
The concept behind it is to automatize all the file processing necessary for your dependencies (ie : CSS, JS, SVG and HTML files).

## Install

You can install the project after cloning it with a classic install

```bash
npm install
```

## Usage

### Automatic Creation

You can create a new test from the `boilerplate` template.

```bash
npm run new my-new-directory
```

This duplicates the content of the `boilerplate` template.

### Manual creation

You can ceate a directory manually that will contain your sources. The prerequisites are :

-   a `src` subdirectory to contain your sources
-   all `src/type/name.type` files nécessary for your application (exemple: `src/css/main.css` or `src/html/test.html`)
-   an empty `dist` subdirectory that will contain your dist version
-   aLL `*.js` files you need in your directory that will be your source files for the test

## Development

At the moment `css`, `js`, `svg` and `html` files are processed.  
The `*.js` source files in your directory are processed by babel.

### Placeholders

To use a processed file you have to specify the type and name of the file in the `*.js` source file in your directory with double accolades.  
For example : `{{html/test}}` will inject the minified html from the `src/html/test.html` file.

### Command

You can watch all changes and automatically build your dist file with this command from the root of this project :

```bash
npm run start my-new-directory
```

The parameter `my-new-directory` is mandatory.

## Production

Development process and production are identical, but the `build` command does not watch changes.

```bash
npm run build my-new-directory
```

The parameter `my-new-directory` is mandatory.
