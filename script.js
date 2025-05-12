// --- START OF FILE script.js ---

// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // --- Referências aos Elementos do DOM ---
    const generateBtn = document.getElementById('generate-btn');
    const copyAllBtn = document.getElementById('copy-all-btn');
    const exportJsonBtn = document.getElementById('export-json-btn');
    const outputContainer = document.getElementById('output-container');
    const dataItemTemplate = document.getElementById('data-item-template');
    const includePjCheckbox = document.getElementById('include-pj-checkbox');
    const genderSelect = document.getElementById('gender-select');
    const ufSelect = document.getElementById('uf-select');
    const consentCheckbox = document.getElementById('consent-checkbox');
    const placeholderText = outputContainer.querySelector('.placeholder');

    // --- Estado Inicial e Controle do Botão Gerar ---
    generateBtn.disabled = true;
    consentCheckbox.addEventListener('change', () => {
        generateBtn.disabled = !consentCheckbox.checked;
        if (placeholderText) {
            if (generateBtn.disabled) {
                placeholderText.textContent = 'Marque a caixa de consentimento acima para habilitar a geração.';
            } else {
                 const hasData = outputContainer.querySelector('fieldset');
                 if (!hasData) {
                    placeholderText.textContent = 'Selecione as opções desejadas e clique em "Gerar Dados".';
                 }
            }
        }
    });

    // --- Constantes e Listas de Dados ---
    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    const ufToDddMap = { "SP": ["11", "12", "13", "14", "15", "16", "17", "18", "19"], "RJ": ["21", "22", "24"], "MG": ["31", "32", "33", "34", "35", "37", "38"], "BA": ["71", "73", "74", "75", "77"], "PR": ["41", "42", "43", "44", "45", "46"], "RS": ["51", "53", "54", "55"], "SC": ["47", "48", "49"], "PE": ["81", "87"], "CE": ["85", "88"], "DF": ["61"], "ES": ["27", "28"], "GO": ["62", "64"], "MA": ["98", "99"], "MT": ["65", "66"], "MS": ["67"], "PA": ["91", "93", "94"], "PB": ["83"], "PI": ["86", "89"], "RN": ["84"], "RO": ["69"], "RR": ["95"], "SE": ["79"], "TO": ["63"], "AM": ["92", "97"], "AP": ["96"], "AC": ["68"], "AL": ["82"] };
    const allDdds = Object.values(ufToDddMap).flat();
    const firstNamesMale = ["Miguel", "Arthur", "Gael", "Heitor", "Theo", "Davi", "Gabriel", "Bernardo", "Samuel", "João", "Pedro", "Lucas", "Matheus", "Rafael", "Enzo", "Guilherme", "Nicolas", "Lorenzo", "Gustavo", "Felipe", "Daniel", "Benjamin", "Eduardo", "Joaquim", "Leonardo"];
    const firstNamesFemale = ["Helena", "Alice", "Laura", "Maria Alice", "Sophia", "Manuela", "Maitê", "Liz", "Cecília", "Isabella", "Luísa", "Eloá", "Heloísa", "Júlia", "Antonella", "Valentina", "Maya", "Aurora", "Lívia", "Clara", "Beatriz", "Mariana", "Yasmin", "Gabriela", "Alícia"];
    const lastNames = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes", "Dias", "Miranda", "Nunes", "Moreira", "Barros", "Freitas", "Barbosa", "Pinto", "Moura", "Cavalcanti", "Cardoso", "Teixeira", "Araújo", "Fernandes", "Ramos", "Gonçalves", "Santana", "Marques", "Correia"];
    const streetTypes = ["Rua", "Avenida", "Travessa", "Praça", "Alameda", "Estrada", "Rodovia", "Largo", "Viela", "Setor"];
    const neighborhoods = ["Centro", "Vila Nova", "Jardim América", "Boa Vista", "Santa Mônica", "Copacabana", "Ipanema", "Liberdade", "Bela Vista", "Consolação", "Pinheiros", "Botafogo", "Savassi", "Pampulha", "Aldeota", "Meireles", "Setor Bueno", "Jardim Goiás", "Asa Sul", "Asa Norte", "Graça", "Barra", "Recreio", "Tijuca", "Guanabara"];
    const citiesByUf = { "AC": ["Rio Branco"], "AL": ["Maceió"], "AP": ["Macapá"], "AM": ["Manaus"], "BA": ["Salvador", "Feira de Santana"], "CE": ["Fortaleza", "Juazeiro do Norte"], "DF": ["Brasília"], "ES": ["Vitória", "Vila Velha"], "GO": ["Goiânia", "Aparecida de Goiânia"], "MA": ["São Luís"], "MT": ["Cuiabá"], "MS": ["Campo Grande"], "MG": ["Belo Horizonte", "Uberlândia"], "PA": ["Belém"], "PB": ["João Pessoa"], "PR": ["Curitiba", "Londrina"], "PE": ["Recife", "Olinda"], "PI": ["Teresina"], "RJ": ["Rio de Janeiro", "Niterói"], "RN": ["Natal"], "RS": ["Porto Alegre", "Caxias do Sul"], "RO": ["Porto Velho"], "RR": ["Boa Vista"], "SC": ["Florianópolis", "Joinville"], "SP": ["São Paulo", "Campinas", "Guarulhos"], "SE": ["Aracaju"], "TO": ["Palmas"] };
    const allCities = Object.values(citiesByUf).flat().filter((v, i, a) => a.indexOf(v) === i);
    const banks = [ { nome: "Banco do Brasil", numero: "001" }, { nome: "Caixa Econômica Federal", numero: "104" }, { nome: "Bradesco", numero: "237" }, { nome: "Itaú Unibanco", numero: "341" }, { nome: "Santander", numero: "033" }, { nome: "Banco Inter", numero: "077" }, { nome: "Nubank", numero: "260" }, { nome: "BTG Pactual", numero: "208" }, { nome: "Banco Safra", numero: "422" }, { nome: "Banco Neon", numero: "735" }, { nome: "C6 Bank", numero: "336" }, { nome: "Banco Original", numero: "212" }, { nome: "PagBank", numero: "290" }, { nome: "Sicredi", numero: "748" } ];
    const cardFlags = ["Visa", "Mastercard", "Elo", "American Express", "Hipercard"];

    // **NOVO**: Objeto que mapeia Marcas aos seus Modelos
    const carModelsByMake = {
        "Fiat": ["Mobi", "Argo", "Cronos", "Pulse", "Strada", "Toro", "Fastback", "Scudo", "Ducato"],
        "Volkswagen": ["Polo", "Virtus", "Nivus", "T-Cross", "Taos", "Saveiro", "Amarok", "Jetta GLI", "ID.4"],
        "Chevrolet": ["Onix", "Onix Plus", "Tracker", "Montana", "S10", "Spin", "Equinox", "Bolt EV", "Silverado"],
        "Ford": ["Ranger", "Territory", "Bronco Sport", "Maverick", "Mustang Mach-E", "Transit"],
        "Toyota": ["Corolla", "Corolla Cross", "Hilux", "Yaris", "Yaris Sedan", "RAV4", "SW4"],
        "Hyundai": ["HB20", "HB20S", "Creta"],
        "Renault": ["Kwid", "Stepway", "Logan", "Duster", "Oroch", "Captur", "Master", "Kardian"],
        "Honda": ["City", "City Hatch", "HR-V", "ZR-V", "Civic"],
        "Jeep": ["Renegade", "Compass", "Commander", "Gladiator", "Wrangler"],
        "Nissan": ["Kicks", "Versa", "Sentra", "Frontier", "Leaf"],
        "Peugeot": ["208", "2008", "3008", "Partner Rapid", "Boxer", "e-2008"],
        "Citroën": ["C3", "C3 Aircross", "C4 Cactus", "Jumpy", "Jumper"],
        "Mitsubishi": ["L200 Triton", "Eclipse Cross", "Outlander", "Pajero Sport"],
    };
    // **NOVO**: Garante que a lista de marcas usada corresponda às chaves do objeto acima
    const carMakes = Object.keys(carModelsByMake);
    // const carModels = [...]; // LINHA REMOVIDA

    const orgaosEmissores = ["SSP", "DETRAN", "IFP", "DIC", "Polícia Federal", "PC", "PM", "SSP/DF", "PCDF"];
    const professions = ["Tecnologia da Informação", "Engenharia", "Saúde", "Educação", "Direito", "Administração", "Comunicação", "Design", "Finanças", "Recursos Humanos", "Comércio", "Serviços Gerais", "Construção Civil", "Agricultura", "Logística", "Serviço Público"];
    const jobTitles = ["Analista", "Desenvolvedor(a)", "Engenheiro(a)", "Médico(a)", "Enfermeiro(a)", "Professor(a)", "Advogado(a)", "Gerente", "Coordenador(a)", "Assistente", "Técnico(a)", "Designer", "Consultor(a)", "Vendedor(a)", "Atendente", "Diretor(a)", "Especialista", "Operador(a)", "Motorista", "Pedreiro(a)", "Funcionário Público", "Assessor(a)"];
    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const combinedFirstNames = [...firstNamesMale, ...firstNamesFemale];
    const brasiliaRAS = ["Taguatinga", "Ceilândia", "Samambaia", "Gama", "Guará", "Águas Claras", "Planaltina", "Sobradinho", "Recanto das Emas", "Santa Maria", "Vicente Pires", "Cruzeiro", "Sudoeste/Octogonal", "Lago Sul", "Lago Norte", "Park Way", "Candangolândia", "Núcleo Bandeirante", "Riacho Fundo I", "Riacho Fundo II", "Itapoã", "São Sebastião", "Jardim Botânico", "SCIA", "Fercal", "Varjão"];
    const planoPilotoSetores = ["SQS", "SQN", "CLS", "CLN", "SCS", "SCN", "SHS", "SHN", "SDS", "SDN", "SBN", "SBS", "SRTVS", "SRTVN", "SAUS", "SAUN", "SEPS", "SEP/NORTE", "SIG", "SIA", "SMU", "SGCV", "SOF SUL", "SOF NORTE", "SPLM"];
    const blocosLetras = "ABCDEFGHIJKL".split('');
    const letrasConjunto = "ABCDEFGHIJKLMNPQRSTUVWXYZ".split('');

    // --- Preencher Select de UF ---
    ufs.forEach(uf => {
        const option = document.createElement('option');
        option.value = uf;
        option.textContent = uf;
        ufSelect.appendChild(option);
    });

    // --- Funções Geradoras Auxiliares ---
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getRandomElement = (arr) => arr && arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : '';
    const getRandomDigits = (n) => Array.from({ length: n }, () => getRandomInt(0, 9)).join('');
    const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // --- Funções de Validação e Formatação (CPF, CNPJ, etc.) ---
    const calculateCheckDigit = (digits, weights) => {
        if (!digits || typeof digits !== 'string') return '0';
        let sum = 0;
        const len = Math.min(digits.length, weights.length);
        for (let i = 0; i < len; i++) {
            sum += parseInt(digits[i], 10) * weights[i];
        }
        const remainder = sum % 11;
        const vd = remainder < 2 ? 0 : 11 - remainder;
        return vd.toString();
    };
    const generateCPF = () => {
        const base = getRandomDigits(9);
        const vd1 = calculateCheckDigit(base, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
        const vd2 = calculateCheckDigit(base + vd1, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
        const cpf = `${base}${vd1}${vd2}`;
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };
    const generateCNPJ = () => {
        const base = getRandomDigits(8) + '0001';
        const vd1 = calculateCheckDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
        const vd2 = calculateCheckDigit(base + vd1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
        const cnpj = `${base}${vd1}${vd2}`;
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    };
    const generatePIS = () => {
        const base = getRandomDigits(10);
        const vd = calculateCheckDigit(base, [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
        const pis = `${base}${vd}`;
        return pis.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3-$4');
    };
    const generateRenavam = () => {
        let base = getRandomDigits(10);
        while (base.startsWith('00')) { base = getRandomDigits(10); }
        base = base.padStart(10, '0');
        const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let sum = 0;
        for(let i = 0; i < 10; i++) { sum += parseInt(base[i]) * weights[i]; }
        const remainder = sum % 11;
        const vd = remainder < 2 ? 0 : 11 - remainder;
        return `${base}${vd}`.padStart(11, '0');
    };
    const generateCreditCardNumber = (flag) => {
        let prefix = ''; let length = 16;
        switch (flag) {
            case 'Visa': prefix = '4' + getRandomDigits(getRandomInt(12, 15)); length = prefix.length === 13 ? 13 : (prefix.length === 16 ? 16 : 19); break;
            case 'Mastercard': prefix = getRandomElement(['51', '52', '53', '54', '55']) + getRandomDigits(14); length = 16; break;
            case 'Elo': prefix = getRandomElement(['636368', '438935', '504175', '506699','5067', '509', '627780', '636297', '650', '6516', '6550']); prefix += getRandomDigits(16 - prefix.length); length = 16; break;
            case 'American Express': prefix = getRandomElement(['34', '37']) + getRandomDigits(13); length = 15; break;
            case 'Hipercard': prefix = getRandomElement(['606282', '384100', '384140', '384160']); prefix += getRandomDigits(16 - prefix.length); length = 16; break;
            default: prefix = getRandomDigits(15); length = 16;
        }
        prefix = prefix.substring(0, length - 1); let base = prefix; let sum = 0; let doubleUp = true;
        for (let i = base.length - 1; i >= 0; i--) {
            let digit = parseInt(base[i], 10);
            if (doubleUp) { digit *= 2; if (digit > 9) { digit -= 9; } }
            sum += digit; doubleUp = !doubleUp;
        }
        const vd = (sum % 10 === 0) ? 0 : 10 - (sum % 10);
        const cardNumber = base + vd;
        return cardNumber.match(/.{1,4}/g)?.join(' ') ?? cardNumber;
    };
    const generateCardExpiry = () => {
        const month = getRandomInt(1, 12).toString().padStart(2, '0');
        const year = (new Date().getFullYear() + getRandomInt(3, 7)).toString().slice(-2);
        return `${month}/${year}`;
    };
    const generateCVV = (flag) => (flag === "American Express" ? getRandomDigits(4) : getRandomDigits(3));
    const generatePastDate = (minYearAgo = 18, maxYearAgo = 70) => {
        const today = new Date();
        const targetYear = today.getFullYear() - getRandomInt(minYearAgo, maxYearAgo);
        const month = getRandomInt(1, 12);
        const day = getRandomInt(1, 28);
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${targetYear}`;
    };
    const generatePlacaMercosul = () => {
        const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return `${getRandomElement(letras)}${getRandomElement(letras)}${getRandomElement(letras)}${getRandomInt(0, 9)}${getRandomElement(letras)}${getRandomInt(0, 9)}${getRandomInt(0, 9)}`;
    };
    const generateChassi = () => {
        const chars = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789";
        return Array.from({ length: 17 }, () => getRandomElement(chars)).join('');
    };
    const generateSUSCard = () => {
        return getRandomElement(['1', '2', '7', '8', '9']) + getRandomDigits(14);
    };
    const generateIncome = () => formatCurrency(getRandomInt(1412, 25000) + getRandomInt(0, 99) / 100);
    const generateProfessionAndTitle = () => {
        const profession = getRandomElement(professions); const title = getRandomElement(jobTitles);
        return profession.toLowerCase().includes(title.toLowerCase().replace(/\(a\)/g, '').trim()) ? `${title} ${getRandomElement(['Júnior', 'Pleno', 'Sênior', 'Especialista'])}` : `${title} em ${profession}`;
    };

    // --- Funções Geradoras de Endereço para Brasília ---
     const getBrasiliaCep = (tipo, quadra, regiao = null) => {
        let prefix = '70';
        if (tipo === 'SQS' || tipo === 'CLS' || tipo === 'SCS' || tipo === 'SHS' || tipo === 'SDS' || tipo === 'SAUS') { prefix = quadra >= 300 ? '703' : '702'; }
        else if (tipo === 'SQN' || tipo === 'CLN' || tipo === 'SCN' || tipo === 'SHN' || tipo === 'SDN' || tipo === 'SAUN' || tipo === 'SBN' || tipo === 'SBS') { prefix = quadra >= 700 ? '707' : (quadra >= 300 ? '708' : '706'); }
        else if (tipo === 'SIG' || tipo === 'SOF SUL' || tipo === 'SPLM') { prefix = '706'; }
        else if (tipo === 'SIA' || tipo === 'SMU' || tipo === 'SGCV') { prefix = '712'; }
        else if (tipo === 'RA') {
             const raPrefixes = { "Taguatinga": "721", "Ceilândia": "722", "Samambaia": "723","Gama": "724", "Guará": "710", "Águas Claras": "719","Planaltina": "733", "Sobradinho": "730", "Recanto das Emas": "726","Santa Maria": "725", "Vicente Pires": "720", "Lago Sul": "716","Lago Norte": "715", "Park Way": "717", "Cruzeiro": "706","Sudoeste/Octogonal": "706", "Candangolândia": "717","Núcleo Bandeirante": "717", "Riacho Fundo I": "718","Riacho Fundo II": "718", "Itapoã": "715","São Sebastião": "716", "Jardim Botânico": "716", "SCIA": "712","Fercal": "73", "Varjão": "715","default": "73" + getRandomInt(0, 6).toString() };
             prefix = raPrefixes[regiao] || raPrefixes["default"];
        }
        return `${prefix}${getRandomDigits(2)}-${getRandomDigits(3)}`;
    };
    const generatePlanoPilotoResidencialAddress = () => {
        const direcao = getRandomElement(["S", "N"]); const tipoQuadra = `SQ${direcao}`; const quadraNum = getRandomElement([getRandomInt(102, 116), getRandomInt(202, 216), getRandomInt(302, 316), getRandomInt(402, 416), getRandomInt(702, 716)]); const bloco = getRandomElement(blocosLetras); const apto = `${getRandomInt(1, 6)}0${getRandomInt(1, 8)}`; const cep = getBrasiliaCep(tipoQuadra, quadraNum); const asa = direcao === "S" ? "Asa Sul" : "Asa Norte"; return `${tipoQuadra} ${quadraNum} Bloco ${bloco}, Apartamento ${apto}, ${asa} - Brasília - DF, ${cep}`;
    };
    const generatePlanoPilotoCommercialAddress = () => {
        const direcao = getRandomElement(["S", "N"]); const tipoQuadra = `CL${direcao}`; const quadraNum = getRandomInt(101, 416); const bloco = getRandomElement("ABCDE".split('')); const loja = `Loja ${getRandomInt(1, 60)}`; const cep = getBrasiliaCep(tipoQuadra, quadraNum); const asa = direcao === "S" ? "Asa Sul" : "Asa Norte"; return `${tipoQuadra} ${quadraNum} Bloco ${bloco}, ${loja}, ${asa} - Brasília - DF, ${cep}`;
    };
    const generatePlanoPilotoSectorAddress = () => {
        const setor = getRandomElement(planoPilotoSetores.filter(s => !s.startsWith('SQ') && !s.startsWith('CL'))); let quadra, complemento, cep;
        if (setor.includes('Hotel') || setor.includes('Bancario') || setor.includes('Autarquia') || setor.includes('Diversões') || setor.includes('Comercial') || setor.includes('Rádio')) { quadra = `Quadra ${getRandomInt(1, 6)}`; complemento = `Bloco ${getRandomElement(letrasConjunto)}`; cep = getBrasiliaCep(setor, getRandomInt(1, 6)); }
        else if (setor.includes('Indústria') || setor.includes('Gráfica') || setor.includes('Oficina') || setor === 'SIA' || setor === 'SMU') { quadra = `Trecho ${getRandomInt(1, 10)}`; complemento = `Lote ${getRandomInt(1, 200)}`; cep = getBrasiliaCep(setor, getRandomInt(1, 15)); }
        else { quadra = `Quadra ${getRandomInt(1, 10)}`; complemento = `Área Especial ${getRandomInt(1, 20)}`; cep = getBrasiliaCep(setor, getRandomInt(1, 8)); }
        return `${setor}, ${quadra}, ${complemento} - Brasília - DF, ${cep}`;
    };
    const generateAdminRegionAddress = () => {
        const regiaoAdmin = getRandomElement(brasiliaRAS); let addressPart1, addressPart2, cep;
        if (Math.random() < 0.7) { addressPart1 = `Quadra ${getRandomInt(1, 800)}`; addressPart2 = `Conjunto ${getRandomElement(letrasConjunto)}, Casa ${getRandomInt(1, 50)}`; }
        else { addressPart1 = `Rua ${getRandomInt(1, 50)}`; const setorRA = getRandomElement(['Norte', 'Sul', 'Leste', 'Oeste', 'Central', 'Comercial', 'Residencial', getRandomElement(neighborhoods).replace(' ', '')]); addressPart2 = `Lote ${getRandomInt(1, 50)}, Setor ${setorRA}`; }
        cep = getBrasiliaCep('RA', 0, regiaoAdmin); return `${addressPart1}, ${addressPart2}, ${regiaoAdmin} - DF, ${cep}`;
    };
     const generateBrasiliaAddress = () => {
         const rand = Math.random();
         if (rand < 0.45) return generatePlanoPilotoResidencialAddress();
         else if (rand < 0.60) return generatePlanoPilotoCommercialAddress();
         else if (rand < 0.75) return generatePlanoPilotoSectorAddress();
         else return generateAdminRegionAddress();
     };

    // --- Variável para armazenar dados gerados para JSON ---
    let generatedData = {};

    // --- Função Principal de Geração ---
    const generateData = () => {
        if (!consentCheckbox.checked) {
             alert("Por favor, marque a caixa de consentimento para gerar os dados.");
             return;
        }
        outputContainer.innerHTML = '';
        generatedData = {};
        if (placeholderText && placeholderText.parentNode === outputContainer) {
            outputContainer.removeChild(placeholderText);
        }

        const includePJ = includePjCheckbox.checked;
        const selectedGender = genderSelect.value;
        const selectedUfValue = ufSelect.value;
        const selectedUf = selectedUfValue || getRandomElement(ufs);

        // Criação dos Fieldsets e Legends
        const dadosPessoaisFieldset = document.createElement('fieldset');
        const documentosFieldset = document.createElement('fieldset');
        const certidoesFieldset = document.createElement('fieldset');
        const bancariosFieldset = document.createElement('fieldset');
        const cartaoCreditoFieldset = document.createElement('fieldset');
        const veiculoFieldset = document.createElement('fieldset');
        const pjFieldset = includePJ ? document.createElement('fieldset') : null;
        const createLegend = (iconClass, text) => { const legend = document.createElement('legend'); legend.innerHTML = `<i class="${iconClass}"></i> ${text}`; return legend; };
        dadosPessoaisFieldset.appendChild(createLegend('fas fa-id-card', 'Dados Pessoais'));
        documentosFieldset.appendChild(createLegend('fas fa-address-card', 'Documentos'));
        certidoesFieldset.appendChild(createLegend('fas fa-scroll', 'Certidões'));
        bancariosFieldset.appendChild(createLegend('fas fa-university', 'Dados Bancários'));
        cartaoCreditoFieldset.appendChild(createLegend('fas fa-credit-card', 'Cartão de Crédito'));
        veiculoFieldset.appendChild(createLegend('fas fa-car', 'Veículo'));
        if (pjFieldset) { pjFieldset.appendChild(createLegend('fas fa-building', 'Pessoa Jurídica')); }

        // Helper addDataItem
        const addDataItem = (fieldset, sectionKey, fieldId, label, value) => {
            const itemClone = dataItemTemplate.content.cloneNode(true);
            itemClone.querySelector('.data-label').textContent = label;
            const valueSpan = itemClone.querySelector('.data-value');
            valueSpan.textContent = (value !== null && value !== undefined) ? String(value) : 'Erro Geração';
            valueSpan.id = fieldId;
            const copyBtn = itemClone.querySelector('.copy-btn');
            copyBtn.dataset.targetId = fieldId;
            fieldset.appendChild(itemClone);
            if (!generatedData[sectionKey]) { generatedData[sectionKey] = {}; }
            const jsonKey = fieldId.replace(/^(dp|doc|cert|banco|cc|veic|pj)-/, '');
            generatedData[sectionKey][jsonKey] = value;
        };

        // --- Geração e Distribuição dos Dados ---
        const uf = selectedUf;
        const city = (uf === 'DF') ? 'Brasília' : getRandomElement(citiesByUf[uf] || allCities);
        const dddPool = ufToDddMap[uf] || allDdds;
        let firstNamePool = (selectedGender === 'male') ? firstNamesMale : ((selectedGender === 'female') ? firstNamesFemale : combinedFirstNames);
        const firstName = getRandomElement(firstNamePool);
        const lastName = getRandomElement(lastNames) + ' ' + getRandomElement(lastNames);
        const fullName = `${firstName} ${lastName}`;

        // --- 👤 Dados Pessoais ---
        generatedData.dadosPessoais = {};
        addDataItem(dadosPessoaisFieldset, 'dadosPessoais', 'dp-nome', 'Nome Completo', fullName);
        let address;
        if (uf === 'DF') {
            address = generateBrasiliaAddress();
        } else {
            const street = `${getRandomElement(streetTypes)} ${getRandomElement(lastNames)} ${getRandomElement(combinedFirstNames)}`;
            const number = getRandomInt(1, 2000);
            const complement = Math.random() > 0.7 ? `, ${getRandomElement(['Apto', 'Casa', 'Bloco'])} ${getRandomInt(1, 50)}` : '';
            const neighborhood = getRandomElement(neighborhoods);
            const cep = `${getRandomDigits(5)}-${getRandomDigits(3)}`;
            address = `${street}, ${number}${complement}, ${neighborhood}, ${city} - ${uf}, CEP: ${cep}`;
        }
        addDataItem(dadosPessoaisFieldset, 'dadosPessoais', 'dp-endereco', 'Endereço Completo', address);
        const phone = `(${getRandomElement(dddPool)}) 9${getRandomDigits(4)}-${getRandomDigits(4)}`;
        addDataItem(dadosPessoaisFieldset, 'dadosPessoais', 'dp-celular', 'Telefone Celular', phone);
        const emailDomain = getRandomElement(['yahoo', 'gmail', 'outlook', 'hotmail', 'live', 'protonmail', 'uol', 'bol', 'terra']);
        const emailSuffix = uf === 'DF' && Math.random() < 0.1 ? 'bsb.gov.br' : `${emailDomain}.com`;
        const email = `${firstName.toLowerCase().replace(/\s+/g, '.')}.${lastName.toLowerCase().split(' ')[0]}@${emailSuffix}`.replace('..', '.');
        addDataItem(dadosPessoaisFieldset, 'dadosPessoais', 'dp-email', 'E-mail', email);
        addDataItem(dadosPessoaisFieldset, 'dadosPessoais', 'dp-nascimento', 'Data de Nascimento', generatePastDate(18, 75));
        addDataItem(dadosPessoaisFieldset, 'dadosPessoais', 'dp-profissao', 'Profissão/Cargo', generateProfessionAndTitle());
        addDataItem(dadosPessoaisFieldset, 'dadosPessoais', 'dp-renda', 'Renda Mensal (Est.)', generateIncome());
        addDataItem(dadosPessoaisFieldset, 'dadosPessoais', 'dp-sangue', 'Tipo Sanguíneo', getRandomElement(bloodTypes));

        // --- 📄 Documentos ---
        generatedData.documentos = {};
        const cpf = generateCPF();
        addDataItem(documentosFieldset, 'documentos', 'doc-cpf', 'CPF', cpf);
        const rgNumber = `${getRandomDigits(2)}.${getRandomDigits(3)}.${getRandomDigits(3)}-${getRandomDigits(1)}`;
        const orgaoEmissor = (uf === 'DF') ? getRandomElement(["SSP/DF", "PCDF", "DETRAN/DF"]) : getRandomElement(orgaosEmissores);
        const rgCompleto = `${rgNumber} ${orgaoEmissor}${uf === 'DF' ? '' : '/'+uf }`;
        addDataItem(documentosFieldset, 'documentos', 'doc-rg', 'RG (Órgão/UF)', rgCompleto);
        const cnhNumber = getRandomDigits(11);
        const cnhCategory = getRandomElement(['A', 'B', 'AB', 'C', 'D', 'E', 'AC', 'AD', 'AE']);
        const cnhExpiry = generatePastDate(-5, -1); // Validade FUTURA
        addDataItem(documentosFieldset, 'documentos', 'doc-cnh', 'CNH (Nº/Cat./Val.)', `${cnhNumber} / ${cnhCategory} / ${cnhExpiry}`);
        addDataItem(documentosFieldset, 'documentos', 'doc-pis', 'PIS/PASEP', generatePIS());
        const tituloNumber = `${getRandomDigits(4)} ${getRandomDigits(4)} ${getRandomDigits(4)}`;
        const zona = (uf === 'DF') ? getRandomInt(1, 20) : getRandomInt(1, 500);
        const secao = getRandomInt(1, 2000).toString().padStart(4, '0');
        addDataItem(documentosFieldset, 'documentos', 'doc-titulo', 'Título Eleitor (Nº/Zona/Seção)', `${tituloNumber} / ${zona.toString().padStart(3,'0')} / ${secao}`);
        addDataItem(documentosFieldset, 'documentos', 'doc-sus', 'Nº Cartão SUS', generateSUSCard());

        // --- 📜 Certidões ---
        generatedData.certidoes = {};
        const cartorio = (uf === 'DF') ? `Cartório ${getRandomInt(1, 15)}º Ofício de Notas e Registro Civil` : `Cartório de Registro Civil de ${city}`;
        const certNascMatricula = getRandomDigits(32);
        addDataItem(certidoesFieldset, 'certidoes', 'cert-nasc', 'Certidão Nasc.', `Matrícula ${certNascMatricula} / ${cartorio}, ${city}${uf === 'DF' ? '' : '/'+uf}`);
        let isMarried = true;
       
            isMarried = true;
            let spouseFirstNamePool = (selectedGender === 'male') ? firstNamesFemale : ((selectedGender === 'female') ? firstNamesMale : (Math.random() < 0.5 ? firstNamesMale : firstNamesFemale));
            const spouseName = `${getRandomElement(spouseFirstNamePool)} ${getRandomElement(lastNames)}`;
            const marriageDate = generatePastDate(1, 30);
            const certCasamMatricula = getRandomDigits(32);
            addDataItem(certidoesFieldset, 'certidoes', 'cert-casam', 'Certidão Casam.', `Matrícula ${certCasamMatricula} / Casado(a) com ${spouseName} em ${marriageDate} / ${cartorio}`);
       
        if (!isMarried && Math.random() < 0.1) {
             const deathDate = generatePastDate(0, 5);
             const certObitoMatricula = getRandomDigits(32);
             addDataItem(certidoesFieldset, 'certidoes', 'cert-obito', 'Certidão Óbito', `Matrícula ${certObitoMatricula} / Falecido(a) em ${deathDate} / ${cartorio}, ${city}${uf === 'DF' ? '' : '/'+uf}`);
        }

        // --- 🏦 Dados Bancários ---
        generatedData.dadosBancarios = {};
        const banksDF = [...banks, { nome: "BRB - Banco de Brasília", numero: "070" }];
        const bank = (uf === 'DF' && Math.random() < 0.3) ? getRandomElement(banksDF) : getRandomElement(banks);
        const agencia = getRandomDigits(4);
        const conta = `${getRandomDigits(getRandomInt(5, 8))}-${getRandomDigits(1)}`;
        const tipoConta = getRandomElement(['Conta Corrente', 'Conta Poupança', 'Conta Salário']);
        const pixRand = Math.random();
        const chavePix = pixRand > 0.4 ? email : (pixRand > 0.1 ? cpf : phone.replace(/\D/g,''));
        addDataItem(bancariosFieldset, 'dadosBancarios', 'banco-nome', 'Banco', `${bank.nome} (${bank.numero})`);
        addDataItem(bancariosFieldset, 'dadosBancarios', 'banco-agencia', 'Agência', agencia);
        addDataItem(bancariosFieldset, 'dadosBancarios', 'banco-conta', 'Conta', conta);
        addDataItem(bancariosFieldset, 'dadosBancarios', 'banco-tipo', 'Tipo Conta', tipoConta);
        addDataItem(bancariosFieldset, 'dadosBancarios', 'banco-pix', 'Chave Pix (Ex.)', chavePix);

        // --- 💳 Cartão de Crédito ---
        generatedData.cartaoCredito = {};
        const cardFlag = getRandomElement(cardFlags);
        const ccNumber = generateCreditCardNumber(cardFlag);
        const ccExpiry = generateCardExpiry();
        const ccCVV = generateCVV(cardFlag);
        addDataItem(cartaoCreditoFieldset, 'cartaoCredito', 'cc-bandeira', 'Bandeira', cardFlag);
        addDataItem(cartaoCreditoFieldset, 'cartaoCredito', 'cc-numero', 'Número', ccNumber);
        addDataItem(cartaoCreditoFieldset, 'cartaoCredito', 'cc-validade', 'Validade (MM/AA)', ccExpiry);
        addDataItem(cartaoCreditoFieldset, 'cartaoCredito', 'cc-cvv', 'CVV/CVC', ccCVV);
        addDataItem(cartaoCreditoFieldset, 'cartaoCredito', 'cc-nome', 'Nome Impresso', fullName.toUpperCase());

        // --- 🚗 Veículo ---
        generatedData.veiculo = {};
        // **CORREÇÃO**: Gerar marca e modelo de forma conectada
        const carMake = getRandomElement(carMakes); // Escolhe uma marca que tem modelos definidos
        const modelsForMake = carModelsByMake[carMake] || []; // Pega a lista de modelos para essa marca
        const carModel = modelsForMake.length > 0 ? getRandomElement(modelsForMake) : "Modelo Indefinido"; // Escolhe da lista ou fallback
        const fabYear = getRandomInt(2010, new Date().getFullYear()); // Ano de fabricação
        const modelYear = getRandomInt(fabYear, fabYear + 1); // Ano do modelo
        addDataItem(veiculoFieldset, 'veiculo', 'veic-marca', 'Marca', carMake);
        addDataItem(veiculoFieldset, 'veiculo', 'veic-modelo', 'Modelo', carModel); // Modelo correto para a marca
        addDataItem(veiculoFieldset, 'veiculo', 'veic-ano', 'Ano Fab/Modelo', `${fabYear}/${modelYear}`);
        addDataItem(veiculoFieldset, 'veiculo', 'veic-placa', 'Placa (Mercosul)', generatePlacaMercosul());
        addDataItem(veiculoFieldset, 'veiculo', 'veic-renavam', 'Renavam', generateRenavam());
        addDataItem(veiculoFieldset, 'veiculo', 'veic-chassi', 'Chassi (VIN)', generateChassi());

        // --- 🏢 Pessoa Jurídica (Opcional) ---
        if (includePJ && pjFieldset) {
            generatedData.pessoaJuridica = {};
            const baseName = getRandomElement(lastNames);
            const activityOptions = ["Tecnologia", "Consultoria", "Serviços", "Comércio", "Indústria", "Alimentos", "Transportes", "Educação", "Saúde", "Construção", "Assessoria", "Comunicações"];
            const activity = getRandomElement(activityOptions);
            const suffix = getRandomElement(["Ltda", "S/A", "ME", "EPP", "MEI", "Eireli", "Sociedade Unipessoal", "Serviços", "Participações"]);
            const razaoSocial = `${baseName} ${activity} ${suffix}`;
            const nomeFantasia = `${getRandomElement(combinedFirstNames)} ${getRandomElement(['Soluções', 'Group', 'Tech', 'Brasil', 'Log', 'Prime', 'Digital'])} ${activity}`;
            addDataItem(pjFieldset, 'pessoaJuridica', 'pj-razao', 'Razão Social', razaoSocial);
            addDataItem(pjFieldset, 'pessoaJuridica', 'pj-fantasia', 'Nome Fantasia', nomeFantasia);
            const cnpj = generateCNPJ();
            addDataItem(pjFieldset, 'pessoaJuridica', 'pj-cnpj', 'CNPJ', cnpj);
            const ie = getRandomDigits(getRandomInt(9, 14)); const im = getRandomDigits(getRandomInt(6, 11)); const cfdf = getRandomDigits(13);
            const ieLabel = uf === 'DF' ? 'CF/DF' : 'Inscrição Estadual'; const ieValue = uf === 'DF' ? cfdf : ie;
            addDataItem(pjFieldset, 'pessoaJuridica', 'pj-ie', ieLabel, ieValue);
             if (uf !== 'DF') { addDataItem(pjFieldset, 'pessoaJuridica', 'pj-im', 'Inscrição Municipal', im); }
            let pjAddress;
            if (uf === 'DF') { const randPJ = Math.random(); if (randPJ < 0.4) pjAddress = generatePlanoPilotoCommercialAddress(); else if (randPJ < 0.8) pjAddress = generatePlanoPilotoSectorAddress(); else pjAddress = generateAdminRegionAddress(); }
            else { const pjStreet = `${getRandomElement(streetTypes)} ${getRandomElement(lastNames)}`; const pjNumber = getRandomInt(1, 1000); const pjComplement = `${getRandomElement(['Sala', 'Conjunto', 'Loja', 'Andar'])} ${getRandomInt(10, 1500)}`; const pjNeighborhood = getRandomElement(neighborhoods); const pjCep = `${getRandomDigits(5)}-${getRandomDigits(3)}`; pjAddress = `${pjStreet}, ${pjNumber}, ${pjComplement}, ${pjNeighborhood}, ${city} - ${uf}, CEP: ${pjCep}`; }
            addDataItem(pjFieldset, 'pessoaJuridica', 'pj-endereco', 'Endereço Comercial', pjAddress);
            const pjPhone = `(${getRandomElement(dddPool)}) ${getRandomInt(2000, 4999)}-${getRandomDigits(4)}`;
            const pjEmail = `contato@${nomeFantasia.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br`;
            addDataItem(pjFieldset, 'pessoaJuridica', 'pj-telefone', 'Telefone Fixo', pjPhone);
            addDataItem(pjFieldset, 'pessoaJuridica', 'pj-email', 'E-mail Corporativo', pjEmail);
            const repLegalName = fullName; const repLegalDoc = cpf;
            addDataItem(pjFieldset, 'pessoaJuridica', 'pj-rep-legal', 'Representante Legal', `${repLegalName} (CPF: ${repLegalDoc})`);
            const pjBank = (uf === 'DF' && Math.random() < 0.2) ? getRandomElement(banksDF) : getRandomElement(banks.filter(b => b.numero !== '104'));
            const pjAgencia = getRandomDigits(4); const pjConta = `${getRandomDigits(getRandomInt(6, 9))}-${getRandomDigits(1)}`;
            addDataItem(pjFieldset, 'pessoaJuridica', 'pj-banco-nome', 'Banco PJ', `${pjBank.nome} (${pjBank.numero})`);
            addDataItem(pjFieldset, 'pessoaJuridica', 'pj-banco-agencia', 'Agência PJ', pjAgencia);
            addDataItem(pjFieldset, 'pessoaJuridica', 'pj-banco-conta', 'Conta PJ', pjConta);
            const contadorName = `${getRandomElement(combinedFirstNames)} ${getRandomElement(lastNames)}`;
            const crcUf = (uf === 'DF') ? 'DF' : getRandomElement(ufs); const crcCategory = getRandomElement(['O', 'T']); const crc = `${crcUf}${getRandomDigits(6)}/${crcCategory}-${getRandomInt(0,9)}`;
            addDataItem(pjFieldset, 'pessoaJuridica', 'pj-contador', 'Contador (Nome/CRC)', `${contadorName} / CRC: ${crc}`);
            const pjChavePix = Math.random() > 0.5 ? cnpj.replace(/\D/g,'') : `financeiro@${nomeFantasia.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
            addDataItem(pjFieldset, 'pessoaJuridica', 'pj-banco-pix', 'Chave Pix PJ (Ex.)', pjChavePix);
        }

        // --- Adiciona os fieldsets ao DOM ---
        outputContainer.appendChild(dadosPessoaisFieldset);
        outputContainer.appendChild(documentosFieldset);
        outputContainer.appendChild(certidoesFieldset);
        outputContainer.appendChild(bancariosFieldset);
        outputContainer.appendChild(cartaoCreditoFieldset);
        outputContainer.appendChild(veiculoFieldset);
        if (pjFieldset) { outputContainer.appendChild(pjFieldset); }

        // --- Atualiza a UI ---
        generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Gerar Novamente';
        copyAllBtn.style.display = 'inline-flex';
        exportJsonBtn.style.display = 'inline-flex';
    };

    // --- Funções de Cópia e Exportação ---
    const copyToClipboard = (text, buttonElement) => {
        if (!navigator.clipboard) { alert('Seu navegador não suporta a cópia para a área de transferência.'); return; }
        navigator.clipboard.writeText(text).then(() => {
            const originalText = buttonElement.innerHTML; const originalClasses = buttonElement.className;
            buttonElement.innerHTML = '<i class="fas fa-check"></i> Copiado!'; buttonElement.className = originalClasses + ' copied-feedback'; buttonElement.disabled = true;
            setTimeout(() => { buttonElement.innerHTML = originalText; buttonElement.className = originalClasses; buttonElement.disabled = false; }, 1500);
        }).catch(err => { console.error('Erro ao copiar:', err); alert('Erro ao copiar dados.'); });
    };
    outputContainer.addEventListener('click', (event) => {
        const targetButton = event.target.closest('.copy-btn');
        if (targetButton) { const targetId = targetButton.dataset.targetId; const valueElement = document.getElementById(targetId); if (valueElement) { copyToClipboard(valueElement.textContent, targetButton); } }
    });
    const copyAllData = () => {
        let allDataText = ""; outputContainer.querySelectorAll('fieldset').forEach(fieldset => { const legend = fieldset.querySelector('legend'); if (legend) { const legendClone = legend.cloneNode(true); const icon = legendClone.querySelector('i'); if (icon) icon.remove(); allDataText += `\n--- ${legendClone.textContent.trim()} ---\n`; } fieldset.querySelectorAll('.data-item').forEach(item => { const label = item.querySelector('.data-label')?.textContent || ''; const value = item.querySelector('.data-value')?.textContent || ''; if (label && value) { allDataText += `${label.trim().replace(':','')} : ${value}\n`; } }); }); copyToClipboard(allDataText.trim(), copyAllBtn);
    };
    const exportToJson = () => {
        if (Object.keys(generatedData).length === 0) { alert("Gere os dados primeiro antes de exportar."); return; }
        const jsonData = JSON.stringify(generatedData, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.style.display = 'none'; a.href = url;
        const fileNameBase = generatedData?.dadosPessoais?.nome?.toLowerCase().replace(/\s+/g, '_') || 'dados_ficticios';
        a.download = `${fileNameBase}_${Date.now()}.json`;
        document.body.appendChild(a); a.click();
        window.URL.revokeObjectURL(url); document.body.removeChild(a);
        const originalText = exportJsonBtn.innerHTML; const originalClasses = exportJsonBtn.className;
        exportJsonBtn.innerHTML = '<i class="fas fa-check"></i> Exportado!'; exportJsonBtn.className = originalClasses + ' copied-feedback'; exportJsonBtn.disabled = true;
        setTimeout(() => { exportJsonBtn.innerHTML = originalText; exportJsonBtn.className = originalClasses; exportJsonBtn.disabled = false; }, 1500);
    };

    // --- Event Listeners ---
    generateBtn.addEventListener('click', generateData);
    copyAllBtn.addEventListener('click', copyAllData);
    exportJsonBtn.addEventListener('click', exportToJson);

}); // Fim do DOMContentLoaded
// --- END OF FILE script.js ---