# Dev.to Pod

This pod lets you publish your Dendron notes to dev.to

## Instructions

### Installation
```sh
cd {workspace}
npm init -y 
npm install -g dendron-cli
npm install --save @dendronhq/devto-pod
```

### Usage

The below command will publish $FILE_NAME to Dev.To

```sh

API_KEY={API_KEY}
FILE_NAME={FNAME}

cd {workspace}
dendron-cli publishPod --wsRoot ~/Dendron --podId dendron.devto --podPkg @dendronhq/devto-pod --podSource remote --config fname=$FILE_NAME,vaultName=vault,dest=stdout,apiKey=$API_KEY
```

## Configuration

- apiKey: the API Key of your dev.to account. You can follow the instructions [here](https://docs.forem.com/api/#section/Authentication) to get it

## Metadata

* title: string
    - source: frontmatter, title field
    - note title
* tags?: string[];
    - source: frontmatter, `tags` field
* canonical_url?: string;
    - source: `dendron.yml`, obtained from `site.site_url`