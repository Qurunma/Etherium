start npm start
start geth --datadir ./geth/ --networkid 1547 --http --http.corsdomain "*" --allow-insecure-unlock --http --http.api personal,eth,net,web3
timeout /t 10
geth attach \\.\pipe\geth.ipc --exec miner.start(1)
geth attach \\.\pipe\geth.ipc