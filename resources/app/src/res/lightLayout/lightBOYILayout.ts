import { Layout } from '../../supportDev'
export const lightBOYILayout: Layout = {
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
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightNeon',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
            },
            {
                type: 'LightWave',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                options: ['right', 'left'],
            },
            {
                type: 'LightRipple',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightRaindrop',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightSnake',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightPressAction',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightConverage',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            // {
            //     type: 'LightUserPicture',
            //     maxValue: 6,
            //     minValue: 0,
            //     // options: ['1', '2', '3'],
            // },
            {
                type: 'LightSineWave',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightDazzing',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
            },
            {
                type: 'LightKaleidoscope',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightLineWave',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
            },
        ]
    },
    reportRate: [125, 250, 500, 1000]
}