import { Layout } from '../../supportDev'
export const lightHFLayout: Layout = {
    light: {
        isRgb: true,
        types: [
            {
                type: 'LightOff',
            },
            {
                type: 'LightAlwaysOn',
                maxValue: 6,
                minValue: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightBreath',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightNeon',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
            },
            {
                type: 'LightWave',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                options: ['right', 'left', 'down', 'up'],
                // dazzle:true
            },
            {
                type: 'LightRipple',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightRaindrop',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightSnake',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightPressAction',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightConverage',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },

            {
                type: 'LightSineWave',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightKaleidoscope',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },

            {
                type: 'LightLineWave',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
            },
            {
                type: 'LightLaser',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightCircleWave',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightDazzing',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightUserPicture',
                maxValue: 4,
                minValue: 0,
            },
            {
                type: 'LightMusicFollow',
                maxValue: 4,
                minValue: 0,
                options: ['upright', 'separate', 'intersect'],
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightScreenColor',
                // maxValue: 6,
                // minValue: 0,
            },
            {
                type: 'LightMusicFollow2',
                maxValue: 4,
                minValue: 0,
                rgb: true,
                dazzle: true
            },
        ]
    },
    reportRate: [125, 250, 500, 1000]
}