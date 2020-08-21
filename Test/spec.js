const Application = require('spectron').Application
const assert = require('assert')
const electron = require('electron')
const path = require('path')

describe('Application launch', function () {

    jest.setTimeout(10000);
    let app = null

    beforeEach(function () {
        app = new Application({
            path: electron,
            args: [path.join(__dirname, '../electron/electron.js')],
            env: {
                MODE: "TEST"
            }
        })
        return app.start()
    })

    afterEach(function () {
        if (app && app.isRunning()) {
            return app.stop()
        }
    })

    it('shows an initial window', function () {
        return app.client.getWindowCount().then(function (count) {
            if (count === 2) {
                console.error("Check the dev tools window is disabled")
            }
            assert.equal(count, 1)
        })
    })
})
