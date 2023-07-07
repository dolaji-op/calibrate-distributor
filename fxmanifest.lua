fx_version 'cerulean'
game 'gta5'

ui_page 'html/index.html'

shared_scripts {
    'config.lua',
    'language.lua',
}

client_scripts {
    'client/standlone.lua',
	'client/main.lua',
}

server_scripts {
    'server/standlone.lua',
	'server/main.lua',
}

files {
    'html/index.html',
    'html/main.js',
    'html/style.css',
}

escrow_ignore {
    'config.lua',
    'language.lua',
    'client/standlone.lua',
    'server/standlone.lua',
}

lua54 'yes'

