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
