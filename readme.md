# Middlepack

Middlepack is a combination of Middleman and Webpack, which is used as an external pipeline. It is also set up to use [Tailwind](https://tailwindcss.com/) as a CSS framework with PostCSS.

## Requirements

- Ruby 2.6.2+
- Node 10.0.0+

## Installation

Clone this repository

```bash
$ git clone https://github.com/gavlak/middlepack <project_name>
$ cd <project_name>
```

You need to remove .git directory and initialize your own:

```bash
$ rm -r .git
$ git init
```

Now we need to install Ruby Gems and NPM packages:

```bash
$ bundle install
...

$ npm install
```

After the installation of the packages and gems is successful you can start using Middlepack.

## Usage

Usage is the same as with regular [Middleman](https://middlemanapp.com/). To start a development server you need to run:

```bash
bundle exec middleman server
```

To build a production version of the site you can run:

```bash
bundle exec middleman build
```