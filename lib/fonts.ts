import localFont from 'next/font/local';

export const clashDisplay = localFont({
    src: [
        { path: '../public/fonts/ClashDisplay-Extralight.otf', weight: '200' },
        { path: '../public/fonts/ClashDisplay-Light.otf', weight: '300' },
        { path: '../public/fonts/ClashDisplay-Regular.otf', weight: '400' },
        { path: '../public/fonts/ClashDisplay-Medium.otf', weight: '500' },
        { path: '../public/fonts/ClashDisplay-Semibold.otf', weight: '600' },
        { path: '../public/fonts/ClashDisplay-Bold.otf', weight: '700' },
    ],
    variable: '--font-hero',
    display: 'swap',
});

export const panchang = localFont({
    src: [
        { path: '../public/fonts/Panchang-Extralight.otf', weight: '200' },
        { path: '../public/fonts/Panchang-Light.otf', weight: '300' },
        { path: '../public/fonts/Panchang-Regular.otf', weight: '400' },
        { path: '../public/fonts/Panchang-Medium.otf', weight: '500' },
        { path: '../public/fonts/Panchang-Semibold.otf', weight: '600' },
        { path: '../public/fonts/Panchang-Bold.otf', weight: '700' },
        { path: '../public/fonts/Panchang-Extrabold.otf', weight: '800' },
    ],
    variable: '--font-heading',
    display: 'swap',
});

export const hkGroteskWide = localFont({
    src: [
        { path: '../public/fonts/hkgroteskwide-light.otf', weight: '300' },
        { path: '../public/fonts/hkgroteskwide-regular.otf', weight: '400' },
        { path: '../public/fonts/hkgroteskwide-medium.otf', weight: '500' },
        { path: '../public/fonts/hkgroteskwide-semibold.otf', weight: '600' },
        { path: '../public/fonts/hkgroteskwide-bold.otf', weight: '700' },
        { path: '../public/fonts/hkgroteskwide-extrabold.otf', weight: '800' },
        { path: '../public/fonts/hkgroteskwide-black.otf', weight: '900' },
    ],
    variable: '--font-ui',
    display: 'swap',
});

export const spaceGrotesk = localFont({
    src: [
        { path: '../public/fonts/SpaceGrotesk-Light.otf', weight: '300' },
        { path: '../public/fonts/SpaceGrotesk-Regular.otf', weight: '400' },
        { path: '../public/fonts/SpaceGrotesk-Medium.otf', weight: '500' },
        { path: '../public/fonts/SpaceGrotesk-SemiBold.otf', weight: '600' },
        { path: '../public/fonts/SpaceGrotesk-Bold.otf', weight: '700' },
    ],
    variable: '--font-body',
    display: 'swap',
});
