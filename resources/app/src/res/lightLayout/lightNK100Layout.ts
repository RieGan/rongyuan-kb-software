import { Layout } from '../../supportDev'
export const lightNK100Layout: Layout = {
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
                dazzle: true
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
                options: ['z', 'return'],
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
                options: ['out', 'in'],
                rgb: true,
                dazzle: true
            },

            {
                type: 'LightLineWave',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                // rgb: true,
                // dazzle: true
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
                options: ['anti-clockwise', 'clockwise'],
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
            // {
            //     type: 'LightRainDown',
            //     maxValue: 4,
            //     minValue: 0,
            //     maxSpeed: 4,
            //     minSpeed: 0,
            //     rgb: true,
            //     dazzle: true
            // },
            // {
            //     type: 'LightMeteor',
            //     maxValue: 4,
            //     minValue: 0,
            //     maxSpeed: 4,
            //     minSpeed: 0,
            //     rgb: true,
            //     dazzle: true
            // },
            // {
            //     type: 'LightPressActionOff',
            //     maxValue: 4,
            //     minValue: 0,
            //     maxSpeed: 4,
            //     minSpeed: 0,
            //     rgb: true,
            //     dazzle: true
            // },
            // {
            //     type: 'LightUserPicture',
            //     maxValue: 4,
            //     minValue: 0,
            //     options: ['1', '2', '3'],
            // },
            // {
            //     type: 'LightTrain',
            //     maxValue: 4,
            //     minValue: 0,
            //     maxSpeed: 4,
            //     minSpeed: 0,
            //     rgb: true,
            //     dazzle: true
            // },
            // {
            //     type: 'LightFireWorks',
            //     maxValue: 4,
            //     minValue: 0,
            //     maxSpeed: 4,
            //     minSpeed: 0,
            //     options: ['right', 'left'],
            //     rgb: true,
            //     dazzle: true
            // },
            {
                type: 'LightMusicFollow',
                options: ['upright', 'separate', 'intersect'],
                maxValue: 4,
                minValue: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightMusicFollow2',
                maxValue: 4,
                minValue: 0,
                rgb: true,
                dazzle: true
            },
            // {
            //     type: 'LightScreenColor',
            // },
        ]
    },
    reportRate: [125, 250, 500, 1000]
}