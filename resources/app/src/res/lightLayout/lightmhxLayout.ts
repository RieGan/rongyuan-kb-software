import { Layout } from '../../supportDev'
export const lightmhxLayout: Layout = {
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
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightWave',
                maxSpeed: 5,
                minSpeed: 0,
                options: ['right', 'left'],
            },
            {
                type: 'LightRipple',
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true,
                options: ['full', 'single'],
            },
            {
                type: 'LightRaindrop',
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightSnake',
                maxSpeed: 5,
                minSpeed: 0,
                options: ['z', 'return'],
                rgb: true
            },
            {
                type: 'LightPressAction',
                maxSpeed: 5,
                minSpeed: 0,
                //options: ['onToOff', 'offToOn'],
                rgb: true
            },
            {
                type: 'LightConverage',
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightNeon',
                maxSpeed: 5,
                minSpeed: 0,
            },
            // {
            //     type: 'LightUserPicture'
            // },
        ]
    },
    reportRate: [125, 250, 500, 1000]
}