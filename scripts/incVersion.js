const { argv } = require('yargs');

const helpers = require('./helpers');

const pathToRoot = process.cwd();
const pathToPackage = argv.pathToPackage || `${pathToRoot}/package.json`;
const info = helpers.getPackageInfo(pathToPackage);
const pathToPlist =
  argv.pathToPlist || `${pathToRoot}/ios/${info.name}/Info.plist`;
const pathToGradle =
  argv.pathToGradle || `${pathToRoot}/android/app/build.gradle`;
const versionCurrent = helpers.getPackageInfo(pathToPackage).version;
const buildCurrent = helpers.getBuildNumberFromPlist(pathToPlist);
const build = buildCurrent;

const incMajor = argv.M || argv.major;
const incMinor = argv.m || argv.minor;
const incPatch = argv.p || argv.patch;

let increasedIndex = 2;

if (incMajor) {
  increasedIndex = 0;
} else if (incMinor) {
  increasedIndex = 1;
} else if (incPatch) {
  increasedIndex = 2;
} else {
  increasedIndex = 2;
}

const versionSplit = versionCurrent.split('.');
versionSplit[increasedIndex]++;
while (increasedIndex < 2) {
  increasedIndex++;
  versionSplit[increasedIndex] = 0;
}
const version = versionSplit.join('.');

console.log(`Setting version to ${version}`);

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
