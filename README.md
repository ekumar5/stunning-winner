# React Native Makeen Boilerplate
This project is created to be used as a template for frontend mobile React Native projects.

## Getting Started Checklist
1. Click "Use this template" on github (or clone the repo, delete .git folder and create a new repo)
2. Replace `com.makeen.boilerplate` with a new bundle id in `ios/Info.plist` and application id in `android/app/build
.gradle`
3. Replace `android/app/google-services.json` and `ios/GoogleService-Info.plist`
4. Replace app name in `ios/Info.plist` and `android/app/src/main/res/values/strings.xml`
5. Replace app assets in `ios/boilerplate/Images.xcassets` and `android/app/src/main/res`
6. Remove this section from Readme

## Workflow guidelines

- When you start working on a ticket `XX-XXXX`, create a branch from develop
  called `XX-XXXX`. Move jira ticket to in progress.
- Commit your changes with this naming pattern: “\<change type\>:
  \<short change description\>`\n\n`XX-XXXX \<optional long description\>“.
  For example: “fix: Add notification listener cleanup on unmount`\n\n`XX-2308”.
  You can also add a long description after two line breaks.
- When you are done with changes for a ticket, push your changes to branch
  `XX-XXXX`.
- Create a PR that’s named "`XX-XXXX` \<short task description\>".
- Move ticket to Code Review
- Assign to Dev Lead
- After each task, check and review open PRs

## Getting started
### Environment Setup

Follow the latest instructions from https://reactnative.dev/docs/environment-setup

TLDR: Install these:
- Watchman: `brew install watchman`
- NVM: `brew install nvm`
- Node 14 or later: `nvm install 14 && nvm use 14`
- Yarn: `brew install yarn`
- Cocoapods: `sudo gem install cocoapods`
- JDK: `brew tap homebrew/cask-versions && brew install --cask zulu11`
- Android Studio: https://developer.android.com/studio/index.html
- Xcode: https://apps.apple.com/us/app/xcode/id497799835?mt=12

### Running the app

- Clone repo
```
git clone git@github.com:Vyoo/vyoo-mobile.git
```
- Install dependencies
```
yarn && npx pod-install
```
- Launch app
```
yarn android
yarn ios
```
You can also use pre-made run configs for IDEA IDEs. See `.run` folder

### Useful Scripts

Run devtools:
```
yarn devtools
```
Run reactotron:
```
yarn reactotron
```
Clean caches:
```
yarn clean
```
Merge branches:
```
yarn merge:dev:stage
yarn merge:stage:master
```

## Storybook
To run storybook app, set `STORYBOOK=true` in `.env` file, then build the app as normal.

With debug builds you also can run storybook server by running this command:
```bash
yarn storybook
```
Then open http://localhost:7007/ in browser to open storybook web UI.

## Fastlane Support

# IOS
Update `PACKAGE_NAME`, `APPLE_ID`, `APPSTORE_CONNECT_ID` and `APPSTORE_PORTAL_ID` in your bash profile.
# Android
Update `GOOGLE_API_KEYS` in your bash profile.
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

----
## Useful Scripts
All examples below use yarn. To use npm, replace `yarn` with `npm run`.

Push a new beta build to TestFlight
```
yarn testflight
```

Push a new beta build to play store
```
yarn playalpha
```

### Increment Build Number
To increment build number by one, run this command:
```
yarn build:number:up
```

### Set Version Name
To set the version name, run this command:
```
yarn version:set {Major}.{Minor}.{Patch}
```

#### Increment Version Name
To increment the version name, run this command:
```
yarn version:up [-M | -major | -m | -minor | -p | -patch]
```
When minor version is incremented, patch is reset. When major version is incremented, minor and patch are reset.

### Merge branches
To merge current develop to stage, then return back to develop, run this script:
```
yarn merge:dev:stage
```
To merge stage to master:
```
yarn merge:stage:master
```
