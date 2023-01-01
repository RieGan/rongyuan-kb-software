import { Layout } from '../../supportDev'
export const lightK98Layout: Layout = {
    light: {
        isRgb: true,
        types: [
            {
                type: 'LightOff',
            },
            {
                type: 'LightAlwaysOn',
                maxValue: 4,
                minValue: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightBreath',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightNeon',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
            },
            {
                type: 'LightWave',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                options: ['right', 'left', 'down', 'up'],
                rgb: true,
                dazzle:true
            },
            {
                type: 'LightRipple',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightRaindrop',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightSnake',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightPressAction',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightConverage',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },

            {
                type: 'LightSineWave',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightKaleidoscope',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },

            {
                type: 'LightLineWave',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
            },
            {
                type: 'LightLaser',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightCircleWave',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightDazzing',
                maxValue: 4,
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
                // maxValue: 4,
                // minValue: 0,
                options: ['upright', 'separate', 'intersect'],
                rgb: false
            },
            // {
            //     type: 'LightScreenColor',
            //     // maxValue: 4,
            //     // minValue: 0,
            // },
            {
                type: 'LightMusicFollow2',
                rgb: false
            },
        ]
    },
    reportRate: [125, 250, 500, 1000]
}