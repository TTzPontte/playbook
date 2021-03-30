# How to implement a new Partner WhiteLabel?

Clone the `stargate-ui` repo and create a new branch named with the white label you want to add:

```
git clone git@github.com:pontte/stargate-ui.git
git checkout -b feat/new-white-label
```

Inside the repo you will find a package named `stargate--ui-styles` where we have the rules for themes. There you'll have the `partners.js` file
where you can add the new partner's rules for the white label. If you need to find out what the colors primary, secondary, etc are you can check at the XD link.

The specific rules for partner themes you can look here:
[Theme Business Rules](https://xd.adobe.com/view/f65d5ae9-0c32-4339-95e8-d6e0de858ee2-a30e/screen/e539641e-d4e0-43e6-b526-8f2acbd42f44/)

```javascript
  partner: {
    background: backgroundDefault,
    primary: '#1072B8',
    secondary: '#55BC85',
    tertiary: lightest,
    poweredBy: true,
 },
```

After adding the partner config theme you can open a pull request on the stargate-ui repo and wait to be reviwed.
When your PR is reviwed you can merge the code to generate a new version of the package styles because you are going to need it later.

Clone the `portal-frontend` repo and create a new branch named with the white label you want to add.

```
git@github.com:pontte/portal-frontend.git
git checkout -b feat/new-white-label
```

Get the latest updates from the Design System Stargate UI with the following command:

`npm i @pontte/stargate-ui-{styles,core,icons}@latest -S`
 
Inside `portal-frontend` you can find a file from `site` called `partners.js`
Add the partner name inside the array on new partners:

```javascript
export const PARTNERS_THEME_NEW = [
  'apto',
  'even',
  'centralMaster',
];
export const hasNewPartnerTheme = (partner) => PARTNERS_THEME_NEW.includes(partner);
```

Add the logo img of the partner inside the assets folder at the Header's component.
Add the logo img extension type inside the `Parters.js` utils file.

```javascript
  partner: {
    iconExtension: 'svg',
  },
```

You're all set, test the new partner theme at `/simulacao`, `/simulacao/aprovada` and `/cadastro`.

Then go on and create a Pull Request, someone from Pontte's engineering team will review it :ok_hand: :pray:

[Back to the index](..)
