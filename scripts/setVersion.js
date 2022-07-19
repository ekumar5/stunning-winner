const argv = require('yargs').argv;

const helpers = require('./helpers');

const pathToRoot = process.cwd();
const pathToPackage = argv.pathToPackage || `${pathToRoot}/package.json`;
const info = helpers.getPackageInfo(pathToPackage);
const pathToPlist =
  argv.pathToPlist || `${pathToRoot}/ios/${info.name}/Info.plist`;
const buildCurrent = helpers.getBuildNumberFromPlist(pathToPlist);
const build = buildCurrent;
const pathToGradle =
  argv.pathToGradle || `${pathToRoot}/android/app/build.gradle`;
const version = argv._[0];

if (!version || version.split('.').length < 2) {
  console.log(
    '\nVersion arg is not properly formatted. Please use this format for the first argument: {Major}.{Minor}.{Path} Example: 1.1.12',
  );
  process.exit();
}

const chain = new Promise(resolve => {
  resolve();
});

const update = chain
  .then(() => {
    console.log('Updating version in package.json...');
    helpers.changeVersionInPackage(pathToPackage, version);
    console.log('done');
  })
  .then(() => {
    console.log('Updating version in xcode project...');
    helpers.changeVersionAndBuildInPlist(pathToPlist, version, build);
    console.log('done');
  })
  .then(() => {
    console.log('Updating version in android project...');
    helpers.changeVersionAndBuildInGradle(pathToGradle, version, build);
    console.log('done');
  });

update.then(() => {
  console.log('Success');
});
