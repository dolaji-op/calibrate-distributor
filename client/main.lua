InUI = false
local callback = false


RegisterNUICallback('callback', function(data, cb)
    SetNuiFocus(false, false)
    callback = data.success
    InUI = false
    cb({})
end)

RegisterNUICallback('exit', function()
    startTask(false)
end)

local startTask = function(bool)
    SetNuiFocus(bool, bool)
    SendNUIMessage({
        action = "ui",
        toggle = bool,
    })
    InUI = bool
end

local startDistributor = function(check)
    startTask(check)
    Wait(550)
    while InUI do
        Wait(200)
    end
    return callback
end

exports('startDistributor', startDistributor)

-- RegisterCommand('calibratedistributor', function()
--     local result = exports['calibrate-distributor']:startDistributor(true)
--     print(result, 'calibrate distributor result')
-- end, false)


