# 🇧🇷 Gerador de Dados Fictícios Brasileiros para Testes 🚀

Uma ferramenta front-end simples e eficaz, construída com HTML, CSS e JavaScript puro, para gerar dados brasileiros realistas (mas 100% FALSOS) para fins de teste e desenvolvimento. Apresenta um tema escuro moderno inspirado na paleta Dracula.

## 📸 Visão Geral

*(Insira aqui um GIF animado ou um screenshot da aplicação em funcionamento, mostrando o tema escuro e os dados gerados. Exemplo:)*
![Screenshot do Gerador de Dados](caminho/para/seu/screenshot.png)

## ✨ Funcionalidades Principais

-   Geração de dados para **Pessoa Física (PF)** e opcionalmente **Pessoa Jurídica (PJ)**.
-   **Filtros** por Gênero e UF (Estado) desejado.
-   Ampla variedade de dados gerados:
    -   **Dados Pessoais:** Nome Completo, Endereço Completo (incluindo lógica específica para Brasília/DF e Regiões Administrativas), Telefone Celular, E-mail, Data de Nascimento, Profissão/Cargo, Renda Mensal Estimada, Tipo Sanguíneo.
    -   **Documentos:** CPF, RG (com Órgão Emissor/UF), CNH (com Número, Categoria e Validade), PIS/PASEP, Título de Eleitor (com Número, Zona e Seção), Número do Cartão SUS.
    -   **Certidões:** Certidão de Nascimento (com Matrícula e Cartório), Certidão de Casamento (com dados do cônjuge, data e cartório), Certidão de Óbito (ocasionalmente).
    -   **Dados Bancários PF:** Nome do Banco (incluindo BRB para DF), Agência, Conta, Tipo de Conta, Chave Pix (Exemplo).
    -   **Cartão de Crédito:** Bandeira, Número, Validade (MM/AA), CVV/CVC, Nome Impresso no Cartão.
    -   **Veículo:** Marca, Modelo (correlacionado com a marca), Ano Fabricação/Modelo, Placa (Padrão Mercosul), Renavam, Chassi (VIN).
    -   **Dados PJ (se selecionado):** Razão Social, Nome Fantasia, CNPJ, Inscrição Estadual (ou CF/DF para o DF), Inscrição Municipal, Endereço Comercial, Telefone Fixo, E-mail Corporativo, Representante Legal (usando dados PF gerados), Dados Bancários PJ, Contador (Nome/CRC).
-   **Interface Responsiva:** Adaptada para uso em desktops, tablets e dispositivos móveis.
-   **Tema Escuro Moderno:** Estilo "Dracula-inspired" para uma experiência visual agradável e confortável.
-   **Funcionalidades de Cópia:** Copie campos individualmente com um clique, ou todos os dados gerados de uma vez.
-   **Exportação para JSON:** Exporte todos os dados gerados em um arquivo `.json` formatado para fácil integração em outros sistemas ou testes.
-   **Aviso Legal e Caixa de Consentimento:** Ênfase no uso ético e legal dos dados gerados, exigindo consentimento do usuário.

## ⚠️ Aviso Legal Importante

Os dados gerados por esta ferramenta são **100% FICTÍCIOS** e produzidos algoritmicamente. Eles são destinados **EXCLUSIVAMENTE** para fins de:
-   Desenvolvimento de software
-   Testes de sistemas e aplicações (QA)
-   Validação de layouts e formulários
-   Demonstrações e prototipagem
-   Estudos e aprendizado

**NUNCA utilize estes dados em ambientes de produção, para fins ilegais, para tentar se passar por outra pessoa, ou para qualquer atividade que não seja estritamente de teste ou desenvolvimento.**

O uso indevido dos dados gerados é de **total responsabilidade do usuário**. Respeite a Lei Geral de Proteção de Dados (LGPD) e outras legislações aplicáveis sobre privacidade e proteção de dados. Ao usar esta ferramenta, você concorda com o termo de consentimento explicitamente apresentado na interface antes da geração dos dados.

## 🛠️ Tecnologias Utilizadas

-   **HTML5:** Estrutura semântica da página.
-   **CSS3:** Estilização completa, tema escuro "Dracula-inspired" e responsividade (Flexbox, Grid).
-   **JavaScript (Vanilla JS):** Toda a lógica de geração de dados, manipulação do DOM, interatividade e funcionalidades de cópia/exportação. Nenhum framework ou biblioteca JS externa (exceto Font Awesome e Google Fonts).
-   **Font Awesome:** Para ícones nos botões e legendas.
-   **Google Fonts:** Para a fonte do título (Orbitron) e corpo (Segoe UI).

## 🚀 Como Usar

1.  **Clone ou baixe este repositório:**
    ```bash
    git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
    cd NOME_DO_REPOSITORIO
    ```
    (Substitua `SEU_USUARIO/NOME_DO_REPOSITORIO` pelo URL real do seu repositório)

2.  **Abra o arquivo `index.html`** no seu navegador de preferência (Google Chrome, Firefox, Edge, etc.).

3.  **Leia o Aviso Legal** e **marque a caixa de consentimento** para habilitar a geração de dados. O botão "Gerar Dados" só será ativado após o consentimento.

4.  **Selecione as opções desejadas:**
    -   **Gênero:** Qualquer, Masculino ou Feminino.
    -   **UF:** Escolha um estado específico ou deixe "Qualquer" para aleatoriedade.
    -   **Incluir PJ:** Marque esta caixa se desejar gerar dados de Pessoa Jurídica associados.

5.  Clique em "**Gerar Dados**" (ou "**Gerar Novamente**").

6.  Os dados fictícios serão exibidos em seções organizadas.

7.  **Interaja com os dados:**
    -   Clique no ícone de cópia ao lado de cada campo para copiar o valor individualmente.
    -   Use o botão "**Copiar Tudo**" para copiar todos os dados formatados para a área de transferência.
    -   Use o botão "**Exportar JSON**" para baixar um arquivo `.json` com todos os dados gerados.

## 🏛️ Rodapé

O rodapé contém links úteis que podem ser personalizados para sua organização ou projeto, como Política de Privacidade, Termos de Uso, etc.

## 🤝 Contribuições

Contribuições são bem-vindas! Se você tiver sugestões de melhoria, novos tipos de dados a serem gerados, ou encontrar algum bug, sinta-se à vontade para abrir uma *Issue* ou enviar um *Pull Request*.

## 📜 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes (se você adicionar um).
Recomenda-se adicionar um arquivo `LICENSE` ao seu repositório. O MIT é uma boa escolha para projetos como este:
