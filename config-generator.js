const fs = require('fs');

trojan_pattern = `
trojan://qvPcrJeudU4kggqyo0oQ@172.67.128.0:2096?security=tls&type=ws&host=worker-dark-king-c93d.vahidtech2077.workers.dev&sni=worker-dark-king-c93d.vahidtech2077.workers.dev&fp=random&path=%2F%3Fed%3D2560##%F0%9F%86%94TelegramID%3A+%40Config_Vortex55%E2%9C%94

`.trim()

vless_pattern = `
vless://2db4f391-5b6f-4f0b-8254-90a0f775361a@199.212.90.119:443?path=%2FIBW4qfAvXK2SUsgY%3Fed%3D2560&security=tls&encryption=none&alpn=h2,http/1.1&host=coNfIGVOrteX55.PaGEs.Dev&fp=randomized&type=ws&sni=ConFigVorteX55.pAges.deV#%F0%9F%86%94TelegramID%3A+%40Config_Vortex55%E2%9C%94
`.trim()
// trojan_pattern = `
// YOUR_TROJAN_COFIG
// `.trim()

// vless_pattern = `
// YOUR_VLESS_COFIG
// `.trim()

var configs;

//Attention : this config using ips get by CloudFlare scan program (https://github.com/MortezaBashsiz/CFScanner)
//It uses ping for sorting and get top 5 best ip to clone ips , so it does not work other scanners due of ping
//In future maybe i made that ;)
//If you have a file with other name you can change it in __config_file_loader__ 
//If you want to make more configs than just limited you can change arguments of each function , also you can choose
//to generate your favor config with callling just your func needed


const config_file_loader = function () {
    //Your ip file
    try {
        configs = fs.readFileSync('./Ips.txt', 'utf-8');
    } catch (error) {
        console.warn("Error during opening file " +  error.message);
    }
}

const trojan_generator = async function (first_index_slice = 0, second_index_slice = 4) {
    try {
        const splited_ips = configs.split('\r');
        const splited_objects = []
        for (let index = 0; index < splited_ips.length; index++) {
            splited_ip_elements = splited_ips[index].split('-');
            splited_objects.push({ "ip": splited_ip_elements[2].trim(), "ping": splited_ip_elements[0].trim() })
        }
        let sorted_ips = splited_objects.sort((a, b) => { }).slice(first_index_slice, second_index_slice)
        console.log(sorted_ips);
        const ports = [443, 8443, 2053, 2083, 2087, 2096]
        const confgis_final = []
        for (let first = 0; first < sorted_ips.length; first++) {
            for (let index = 0; index < ports.length; index++) {
                const regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+)/;
                const new_config = trojan_pattern.replace(regex, `${sorted_ips[first].ip}:${ports[index]}`);
                confgis_final.push(new_config)
            }
        }
        if (fs.existsSync('./trojan_config.txt'))
            fs.unlinkSync('./trojan_config.txt')
        console.log("trojan config ip sizes " + confgis_final.length)
        fs.writeFile(
            'trojan_config.txt',
            confgis_final.join('\n'),
            function (err) { console.log(err ? 'Error :' + err : 'ok') }
        );
    }
    catch (error) {
        console.log("Something was wrong " + error.message);
    }
}

const Vless_generator = async function (first_index_slice = 0, second_index_slice = 4) {
    try {
        const splited_ips = configs.split('\r');
        const splited_objects = []
        for (let index = 0; index < splited_ips.length; index++) {
            splited_ip_elements = splited_ips[index].split('-');
            splited_objects.push({ "ip": splited_ip_elements[2].trim(), "ping": splited_ip_elements[0].trim() })
        }
        const sorted_ips = splited_objects.sort((a, b) => { }).slice(first_index_slice, second_index_slice)
        console.log(sorted_ips);
        const ports = [443, 8443, 2053, 2083, 2087, 2096]
        const confgis_final = []
        for (let first = 0; first < sorted_ips.length; first++) {
            for (let index = 0; index < ports.length; index++) {
                const regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+)/;
                const new_config = vless_pattern.replace(regex, `${sorted_ips[first].ip}:${ports[index]}`);
                confgis_final.push(new_config)
            }
        }
        if (fs.existsSync('./vless_config.txt'))
            fs.unlinkSync('./vless_config.txt')
        console.log("vless config ip sizes " + confgis_final.length)
        fs.writeFile(
            'vless_config.txt',
            confgis_final.join('\n'),
            function (err) { console.log(err ? 'Error :' + err : 'ok') }
        );
    } catch (err) {
        console.log("Something was wrong " + err.message);
    }
}
config_file_loader()
Vless_generator(0, 4);
trojan_generator(0, 4);