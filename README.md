# Central Farmingdale

An **unofficial, student-developed Expo / React Native mobile app prototype** for exploring student life and resources. Not affiliated with or endorsed by Farmingdale State College.

## Features

- A green Central Farmingdale home dashboard with eight clickable feature cards.
- Campus Map page with a button opening https://map.farmingdale.edu/ in the device browser.
- Events & Clubs, Class Schedule, Dining & Food, Announcements, Student Resources, Student Profile and Campus Overview pages.
- Return-to-dashboard buttons using `router.replace('/')`, rather than `router.back()`.
- A shared theme and reusable feature-screen layout.

**Prototype limitations:** The Events, Schedule, Dining, Announcements, Profile, and Campus Overview screens contain explanatory demo content, not verified real-time feeds. No student login, campus API access, or personal student data connection is configured.

## Run the app

Install Node.js, clone this repository and run:

```powershell
npm install
npx expo start --clear
```

Scan the QR code using Expo Go. The root route `/` displays the dashboard. If Expo Go reopens a previously visited deep link such as `/map`, leave the previous project preview and open the project's root link.

## Source files

- `src/app/index.tsx`: main dashboard
- `src/app/map.tsx`: campus map screen
- `src/app/_layout.tsx`: route registrations
- `src/app/events.tsx`, `schedule.tsx`, `dining.tsx`, `announcements.tsx`, `resources.tsx`, `profile.tsx`, `dashboard.tsx`: additional screens
- `src/components/FeatureScreen.tsx`: shared page layout
- `src/constants/theme.ts`: colors

## Implementation notes

Expo Router uses file-based paths: `index.tsx` is `/` and `map.tsx` is `/map`. The source includes no redirect from `/` to `/map`. Back arrows use `router.replace('/')` to navigate straight to the dashboard regardless of the current navigation history. Opening the external map launches the college website in the browser.

A working Node/Expo installation and an iOS or Android device are needed for complete runtime verification. This initial pull request has not been device-tested.

## Responsible use and AI disclosure

The code scaffold, demo screens, route logic and this documentation were drafted with assistance from OpenAI ChatGPT on November 11, 2026. The project owner should review generated code, verify any campus-facing information and perform device testing before submission or public release. Avoid collecting school passwords or claiming official affiliation.


## Official Farmingdale information (proposed update)

The eight feature screens now show useful, source-linked public campus information in native React Native cards:

- Campus Map: interactive map, visitor directions, shuttle
- Events & Clubs: student activities, RamCentral information
- Class Schedule: Registrar and academic calendar; personal schedule requires official login
- Dining & Food: POPs, Campus Center, cafes and CampusDish
- Announcements: college homepage, campus calendar and academic dates
- Student Resources: tutoring, registrar, activities, careers, directory
- Student Profile: guest mode and official myFSC access; no credentials collected
- Campus Overview: shortcuts to key official resources

Sources are primarily public pages at https://www.farmingdale.edu/ and https://map.farmingdale.edu/. Information is a general guide, not a live API feed. Buttons open the relevant official source for the latest details. No private college systems, personal records, push alerts, or authenticated data integrations are implemented. The app is independent and not an official college application.

### Test the proposed changes

After reviewing and merging the PR, from your existing cloned repository run:

```powershell
git pull origin main
npm.cmd install
npx.cmd expo start --clear
```

Open the app in Expo Go and test each of the eight feature screens and source links. The code has not yet been validated on a device.

### AI use for this update

AI assistance was used to draft the native information cards, screen content and official resource links. The developer must verify links, current campus details, TypeScript compilation and Expo Go behavior before relying on this build.


## Expo Go SDK 58 compatibility

This project targets **Expo SDK 58** (React 19.3 and React Native 0.88), matching the current iOS Expo Go major SDK. The SDK 54 package versions previously caused an "incompatible version of Expo Go" error. Node.js 22.13+ is required; use a supported Node LTS version where possible.

After this PR is merged, update your **existing clone** in PowerShell:

```powershell
git pull origin main
npm.cmd install
npx.cmd expo install --fix
npx.cmd expo-doctor
npm.cmd run typecheck
npx.cmd expo start --clear
```

If your local install was interrupted and `npm ls expo react --depth=0` reports invalid versions, stop Expo, then clean the install and retry:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm.cmd install
npx.cmd expo install --fix
```

Do **not** use `--force` or `--legacy-peer-deps` to bypass peer dependency errors. Do not commit `node_modules`. Commit the regenerated `package-lock.json` only after successful installation.

This upgrade is proposed for testing; it has not yet been verified on the user's iPhone or by a complete dependency install.
