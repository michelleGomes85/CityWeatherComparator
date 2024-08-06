# CityWeatherComparator 🌦️🌍

## Sobre o projeto

**CityWeatherComparator** é uma aplicação web que permite comparar as condições climáticas de duas cidades diferentes usando a API do OpenWeatherMap.

## Funcionalidades

- 🌍 **Comparação Climática**: Compare informações climáticas entre duas cidades.
- 🌡️ **Dados Exibidos**: País, distância até Barbacena, descrição do tempo, temperatura, sensação térmica, umidade, visibilidade, velocidade do vento, e horários do nascer e pôr do sol.
- 📱 **Interface Responsiva**: Otimizada para diferentes tamanhos de tela.

## Tecnologias Utilizadas

- 🌐 **HTML5**
- 🎨 **CSS3**
- ⚙️ **JavaScript**
- 🌦️ **API do OpenWeatherMap**

## Como Utilizar

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/CityWeatherComparator.git
    ```

2. Navegue até o diretório do projeto:
    ```sh
    cd CityWeatherComparator
    ```

3. Abra o arquivo `index.html` no seu navegador.

4. Insira os nomes das cidades que deseja comparar e clique no botão "Comparar".

## Estrutura do Projeto

   ```sh
   CityWeatherComparator/
    ├── images/
    │ ├── icon.jpg
    │ ├── information_climate.png
    │ ├── rain.png
    │ ├── storm.png
    │ └── sun.png
    ├── style.css
    ├── index.html
    └── javaScript.js
   ```

## Variáveis de Ambiente

Para utilizar a API do OpenWeatherMap, é necessário configurar uma variável de ambiente com a chave da API.

1. Crie um arquivo `.env` na raiz do projeto.
2. Adicione sua chave da API:
    ```sh
    API_KEY=your_openweathermap_api_key
    ```

## Funcionalidades JavaScript

- 🔒 **validate_field**: Impede a entrada de números nos campos de texto das cidades.
- 🔍 **search_field**: Procura um atributo específico dentro de um objeto de dados.
- 📊 **display_table / hide_table**: Exibe ou esconde a tabela de resultados.
- 🌆 **query_city**: Realiza a consulta da cidade na API do OpenWeatherMap.
- 📝 **show_datas**: Exibe os dados da cidade na tabela.
- 🌍 **distance_latitude_longitude**: Calcula a distância entre duas coordenadas.
- 📏 **degrees_to_radian**: Converte graus em radianos.
- 🌡️ **convert_temperature**: Converte temperatura de Kelvin para Celsius.
- 📅 **convert_date**: Converte data Unix para uma string legível.
- ⬇️ **scroll_to_table**: Faz o scroll suave até a tabela de resultados.

- ## Licença / Autor

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/michelleGomes85/CityWeatherComparator/blob/main/LICENSE) 
[![GitHub](https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/michellegomes85)
