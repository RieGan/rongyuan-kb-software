import { Layout } from '../../supportDev'
export const lightAbtX90Layout: Layout = {
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
                rgb: true
            },
            {
                type: 'LightBreath',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
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
            },
            {
                type: 'LightRaindrop',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightSnake',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightPressAction',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightConverage',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },

            {
                type: 'LightRingWaterFall',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightSineWave',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightStarry',
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
                rgb: true
            },
        ]
    },
    reportRate: [125, 250, 500, 1000]
}