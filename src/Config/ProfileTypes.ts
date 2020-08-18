/*
    IPhone SE = smallest size device we accommodate
    deviceSizeLimits -- minimum size for the current bracket
 */

export default [
    {
        name: "Large Phone",
        height: 240,
        width: 380,
        deviceSizeLimits: {
            height: 1792,
            width: 828
        },
        maxCols: 3,
        maxRows: 2
    },
    {
        name: "Small Phone",
        height: 200,
        width: 320,
        deviceSizeLimits: {
            height: 1136,
            width: 640
        },
        maxCols: 3,
        maxRows: 2
    },
    {
        name: "Large Tablet",
        height: 340,
        width: 380,
        deviceSizeLimits: {
            height: 1536,
            width: 2048
        },
        maxCols: 4,
        maxRows: 3
    },
    {
        name: "Small Tablet",
        height: 280,
        width: 340,
        deviceSizeLimits: {
            height: 600,
            width: 1024
        },
        maxCols: 3,
        maxRows: 3
    }
];
