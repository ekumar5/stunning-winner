const helpers = require('./helpers');

const pathToRoot = process.cwd();
const pathToPackage = `${pathToRoot}/package.json`;
const info = helpers.getPackageInfo(pathToPackage);

const pathToPlist = `${pathToRoot}/ios/${info.name}/Info.plist`;
const pathToGradle = `${pathToRoot}/android/app/build.gradle`;

const versionCurrent = info.version;

const buildCurrent = helpers.getBuildNumberFromPlist(pathToPlist);
const build = buildCurrent + 1;

const chain = new Promise(resolve => {
  resolve();
});

const update = chain
  .then(() => {
    console.log('\nUpdating versions');
  })
  .then(() => {
    console.log('Updating version in xcode project...');
    helpers.changeVersionAndBuildInPlist(pathToPlist, versionCurrent, build);
    console.log('done');
  })
  .then(() => {
    console.log('Updating version in android project...');
    helpers.changeVersionAndBuildInGradle(pathToGradle, versionCurrent, build);
    console.log('done');
  });

update.then(() => {
  console.log('Success');
});
