## NatureHub

An application for **Consious Community** People.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

1. NodeJS
2. Angular CLI
3. Firebase CLI
4. Android Studio
5. xCode (Optional)
6. Text Editor (VS Code - Recomended)
7. Gradle
8. Git (Optional)
9. Oh My Zsh (Optional)

### Installing

A step by step series of examples that tell you have to get a development env running

1. Go to [NodeJS Official website] (https://nodejs.org/en/) and download the stable version of NodeJS and install it.
2. After NodeJS successfully install in your computer run `npm install -g @angular/cli` to install Angular CLI.
3. After that run `npm install -g firebase-tools` to install Firebase.
4. Go to [Android Studio Official website] (https://developer.android.com/studio/index.html) and download the android studio and install it.
5. Go to [xCode Official website] (https://developer.apple.com/xcode/) and download the xCode and install it.
6. Go to [VS Code Official website] (https://code.visualstudio.com/) and download the VS Code and install it.
7. Go to [Git Offical website] (https://git-scm.com/) and download Git and install it.
8. Go to [Oh My Zsh official website] (http://ohmyz.sh/) and install it with given command mentioned in their website.

### Other requirements

Steps to make sure the application will run in your computer.

1. Open android studio and go to SDK manager then copy the path to Android SDK Location.
2. Open your terminal and run `open ~/.profile` (`open ~/.zhsrc` if you installed Oh-My-Zsh) and enter these following commnads then save it.

   1. export ANDROID_HOME=Your_Android_SDK_Location
   2. export ANDROID_TOOLS=${ANDROID_HOME}/platform-tools
   3. export PATH=${ANDROID_HOME}:${ANDROID_TOOLS}:${PATH}

   
### Run your tests

Steps to run on Android

1. Connect your android phone with the laptop via USB.
2. Run `adb devices` command on your termial. If you see your device listed below then the app is ready for deploy on your device.
3. run `npm install`.
4. run `ionic cordova platform add android`.
5. run `ionic cordova run android -lc`.

Steps to run on iPhone

1. Connect your iPhone with the laptop via USB.
2. run `npm install`.
3. run `ionic cordova platform add ios`.
4. run `ionic cordova build ios`.
5. Open project directory on Finder and open platforms then ios and open your-project-name.xcodeproj file on xCode.
6. Create a unique bundle identifier for your app.
7. Signin with your apple developer account and check the automatic signin property.
8. Select your device from Devices menu then click on run button.