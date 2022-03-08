# Ora-redes API

## **Contagem de estações**

Método que retorna o total de estações.

- **URL:**

  /api/station/count

- **Método:**

  `POST`

- **Parâmetros na URL:**

  **Obrigatórios:**
  Nenhum

- **Parâmetros do Body:**

  ```javascript
    {
      "filters": {
        "name": [], // Nome da estação
        "network": [], // Tipo de rede (RQA, RHA ou HYBAM)
        "country": [], // País
        "responsible": [], // Órgão responsável
        "river": [], // Rio
        "variable": [] // Variáveis que a estação possui medição
      }
    }
  ```

- **Exemplo:**

  /api/station/count

- **Resposta:**

  - **Código:** 200 <br />
    **Conteúdo:**
    ```javascript
      {
        "count": 896
      }
    ```
  - **Código:** 500 <br />
    **Conteúdo:**
    ```javascript
      {
        "message": 'Internal Server Error'
      }
    ```

## **Contagem de estações por país**

Método que retorna a contagem total de estações por país.

- **URL:**

  /api/station/count/country

- **Método:**

  `POST`

- **Parâmetros na URL:**

  **Obrigatórios:**
  Nenhum

  **Não Obrigatórios:**

  format?:[string] - Formato de saída (permitidos: csv ou json).

* **Parâmetros do Body:**

  ```javascript
    {
      "filters": {
        "name": [], // Nome da estação
        "network": [], // Tipo de rede (RQA, RHA ou HYBAM)
        "country": [], // País
        "responsible": [], // Órgão responsável
        "river": [], // Rio
        "variable": [] // Variáveis que a estação possui medição
      }
    }
  ```

- **Exemplo:**

  /api/station/count/country

- **Resposta:**

  - **Código:** 200 <br />
    **Conteúdo:**
    ```javascript
    [
      {
        country: "Bolívia",
        countryId: 6,
        count: 203,
      },
      {
        country: "Brasil",
        countryId: 9,
        count: 194,
      },
      {
        country: "Colômbia",
        countryId: 7,
        count: 37,
      },
      {
        country: "Equador",
        countryId: 4,
        count: 16,
      },
      {
        country: "Peru",
        countryId: 5,
        count: 444,
      },
      {
        country: "Venezuela",
        countryId: 8,
        count: 2,
      },
    ];
    ```
  - **Código:** 500 <br />
    **Conteúdo:**
    ```javascript
    {
      message: "Internal Server Error";
    }
    ```

## **Contagem de estações por rede**

Método que retorna a contagem total de estações por rede.

- **URL:**

  /api/station/count/network

- **Método:**

  `POST`

- **Parâmetros na URL:**

  **Obrigatórios:**
  Nenhum

  **Não Obrigatórios:**

  format?:[string] - Formato de saída (permitidos: csv ou json).

- **Parâmetros do Body:**

  ```javascript
    {
      "filters": {
        "name": [], // Nome da estação
        "network": [], // Tipo de rede (RQA, RHA ou HYBAM)
        "country": [], // País
        "responsible": [], // Órgão responsável
        "river": [], // Rio
        "variable": [] // Variáveis que a estação possui medição
      }
    }
  ```

- **Exemplo:**

  /api/station/count/network

- **Resposta:**

  - **Código:** 200 <br />
    **Conteúdo:**
    ```javascript
      {
        "values": [
          {
            "network": "HYBAM",
            "count": 91
          },
          {
            "network": "RHA",
            "count": 134
          },
          {
            "network": "RQA",
            "count": 101
          }
        ],
        "total": 326
      }
    ```
  - **Código:** 500 <br />
    **Conteúdo:**
    ```javascript
    {
      message: "Internal Server Error";
    }
    ```

## **Contagem de estações por responsável**

Método que retorna a contagem total de estações por responsável.

- **URL:**

  /api/station/count/responsible

- **Método:**

  `POST`

- **Parâmetros na URL:**

  **Obrigatórios:**
  Nenhum

  **Não Obrigatórios:**

  format?:[string] - Formato de saída (permitidos: csv ou json).

- **Parâmetros do Body:**

  ```javascript
    {
      "filters": {
        "name": [], // Nome da estação
        "network": [], // Tipo de rede (RQA, RHA ou HYBAM)
        "country": [], // País
        "responsible": [], // Órgão responsável
        "river": [], // Rio
        "variable": [] // Variáveis que a estação possui medição
      }
    }
  ```

- **Exemplo:**

  /api/station/count/responsible

- **Resposta:**

  - **Código:** 200 <br />
    **Conteúdo:**
    ```javascript
      {
        "values": [
          {
            "responsible": "ANA",
            "count": 99
          },
          {
            "responsible": "JARI",
            "count": 6
          },
          {
            "responsible": "hybam",
            "count": 91
          },
          {
            "responsible": "ideam",
            "count": 17
          },
          {
            "responsible": "senhami",
            "count": 393
          },
          {
            "responsible": "sinca",
            "count": 152
          },
          {
            "responsible": null,
            "count": 138
          }
        ],
        "total": 896
      }
    ```
  - **Código:** 500 <br />
    **Conteúdo:**
    ```javascript
    {
      message: "Internal Server Error";
    }
    ```

## **Contagem de estações por variável medida**

Método que retorna a contagem de estações por variável medida em cada rede.

- **URL:**

  /api/station/count/variable

- **Método:**

  `POST`

- **Parâmetros na URL:**

  **Obrigatórios:**
  Nenhum

  **Não Obrigatórios:**

  format?:[string] - Formato de saída (permitidos: csv ou json).

- **Parâmetros do Body:**

  ```javascript
    {
      "filters": {
        "name": [], // Nome da estação
        "network": [], // Tipo de rede (RQA, RHA ou HYBAM)
        "country": [], // País
        "responsible": [], // Órgão responsável
        "river": [], // Rio
        "variable": [] // Variáveis que a estação possui medição
      }
    }
  ```

- **Exemplo:**

  /api/station/count/variable

- **Resposta:**

  - **Código:** 200 <br />
    **Conteúdo:**
    ```javascript
    [
      { network: "RQA", variable: "ph", stations: 5 },
      { network: "RQA", variable: "adoptedLevel", stations: 5 },
      { network: "RQA", variable: "flowRate", stations: 5 },
      { network: "RHA", variable: "ph", stations: 10 },
      { network: "RHA", variable: "adoptedLevel", stations: 10 },
      { network: "RHA", variable: "flowRate", stations: 10 },
      { network: "HYBAM", variable: "ph", stations: 3 },
      { network: "HYBAM", variable: "adoptedLevel", stations: 3 },
      { network: "HYBAM", variable: "flowRate", stations: 3 },
    ];
    ```
  - **Código:** 500 <br />
    **Conteúdo:**
    ```javascript
    {
      message: "Internal Server Error";
    }
    ```

## **Ranking de Rios por quantidade de estações**

Método que retorna a um ranking dos rios por quantidade de estações.

- **URL:**

  /api/station/ranking/river

- **Método:**

  `POST`

- **Parâmetros na URL:**

  **Obrigatórios:**
  Nenhum

  **Não Obrigatórios:**

  page:[number] - Número da pagina de registros a ser retornada, cada página contém 5 registros.

  order:[string] - Ordenação dos elementos ('asc' ou 'desc')

  format?:[string] - Formato de saída (permitidos: csv ou json).

- **Parâmetros do Body:**

  ```javascript
    {
      "filters": {
        "name": [], // Nome da estação
        "network": [], // Tipo de rede (RQA, RHA ou HYBAM)
        "country": [], // País
        "responsible": [], // Órgão responsável
        "river": [], // Rio
        "variable": [] // Variáveis que a estação possui medição
      }
    }
  ```

- **Exemplo:**

  /api/station/ranking/river?order=desc&page=1

- **Resposta:**

  - **Código:** 200 <br />
    **Conteúdo:**
    ```javascript
          {
      "x": [
        "Madeira",
        "Rio Maranon",
        "Rio Purus",
        "Rio Solimoes",
        "Rio Branco"
      ],
      "datasets": [
        {
          "label": "RHA",
          "data": [
            0,
            0,
            4,
            0,
            3
          ]
        },
        {
          "label": "RQA",
          "data": [
            0,
            0,
            1,
            0,
            1
          ]
        },
        {
          "label": "HYBAM",
          "data": [
            21,
            11,
            3,
            7,
            2
          ]
        }
      ],
      "position": [
        1,
        2,
        3,
        4,
        5
      ],
      "pages": 18
    }
    ```
  - **Código:** 500 <br />
    **Conteúdo:**
    ```javascript
    {
      message: "Internal Server Error";
    }
    ```

## **Shape das estações**

Método que retorna o shape das estações.

- **URL:**

  /api/station/location

- **Método:**

  `POST`

- **Parâmetros na URL:**

  **Obrigatórios:**
  Nenhum

  **Não Obrigatórios:**

  Nenhum

- **Parâmetros do Body:**

  ```javascript
    {
      "filters": {
        "name": [], // Nome da estação
        "network": [], // Tipo de rede (RQA, RHA ou HYBAM)
        "country": [], // País
        "responsible": [], // Órgão responsável
        "river": [], // Rio
        "variable": [] // Variáveis que a estação possui medição
      }
    }
  ```

- **Exemplo:**

  /api/station/location

- **Resposta:**

  - **Código:** 200 <br />
    **Conteúdo:**
    ```javascript
      {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                -73.9076,
                -4.5132
              ]
            },
            "properties": {
              "code": "220105",
              "name": "SAN REGIS",
              "type": "H",
              "river": null,
              "responsible": "SENHAMI",
              "country": "Peru",
              "countryId": 5,
              "network": "RHA",
              "ph": false,
              "OD": false,
              "electricConductivity": false,
              "turbidity": false,
              "sampleTemperature": false,
              "totalDissolvedSolid": false,
              "totalNitrogen": false,
              "totalOrtophosphate": false,
              "totalSuspensionSolid": false,
              "rain": false,
              "flowRate": false,
              "adoptedLevel": false
            }
          },
          ...
        ]
      }
    ```
  - **Código:** 500 <br />
    **Conteúdo:**
    ```javascript
    {
      message: "Internal Server Error";
    }
    ```

## **Série Temporal de Observações de uma Estação**

Uma série temporal de observações (chuva, vazão ou nível) de uma determinada estação.

- **URL:**

  /api/observation/timeSeries/:network/:stationCode/:dataType/:fequency

- **Método:**

  `GET`

- **Parâmetros na URL:**

  **Obrigatórios:**

  network:[number] - Tipo da rede (rha, rqa ou hybam)

  stationCode:[number] - Código da estação

  dataType:[string] - Tipo de dado - para a rede hidrológica: rain, flowRate ou level; para a rede de qualidade: ph, OD, electricConductivity, turbidity, sampleTemperature, totalDissolvedSolid, totalNitrogen, totalOrtophosphate ou totalSuspensionSolid; para a rede do hybam: flowRate, level, ph, electricConductivity, sampleTemperature ou totalOrtophosphate; para dados brutos: raw.

  frequency:[string] - Frequência dos dados (hour, day, week, month, quarter, year)

  **Não Obrigatórios:**

  format:[string] - Formato de saída (permitidos: csv ou json).

- **Parâmetros do Body:**

  Nenhum

- **Exemplo:**

  /api/observation/timeSeries/351004/rain/day

- **Resposta:**

  - **Código:** 200 <br />
    **Conteúdo:**
    ```javascript
      {
        "x": [
          "2021-12-21T02:00:00.000Z",
          "2021-12-21T01:00:00.000Z",
          "2021-12-21T00:00:00.000Z",
          "2021-12-20T23:00:00.000Z",
          "2021-12-20T22:00:00.000Z",
          ...
        ],
        "y": [
          4,
          6,
          10,
          0,
          0,
          ...
        ]
      }
    ```
  - **Código:** 500 <br />
    **Conteúdo:**
    ```javascript
    {
      message: "Internal Server Error";
    }
    ```

## **Listagem de Estações**

Listagem de estações da rede hidrológica.

- **URL:**

  /api/observation/list/:frequency

- **Método:**

  `POST`

- **Parâmetros na URL:**

  **Obrigatórios:**

  frequency:[string] - Frequência dos dados (hour, day, week, month, quarter, year)

  **Não Obrigatórios:**

  page?:[number] - Número da pagina de registros a ser retornada. Default: 1.
  pageSize?:[number] - Número de elementos por página. Default: 5.
  stationCode?:[string] - Código da estação a ser pesquisada.

- **Parâmetros do Body:**

  ```javascript
    {
      "filters": {
        "name": [], // Nome da estação
        "network": [], // Tipo de rede (RQA, RHA ou HYBAM)
        "country": [], // País
        "responsible": [], // Órgão responsável
        "river": [], // Rio
        "variable": [] // Variáveis que a estação possui medição
      }
    }
  ```

- **Exemplo:**

  /api/observation/list/day

- **Resposta:**

  - **Código:** 200 <br />
    **Conteúdo:**
    ```javascript
      {
        "values": [
          {
            "rain": 0,
            "level": null,
            "code": "15326000",
            "name": "Morada Nova - Jusante",
            "location": {
              "type": "Point",
              "coordinates": [
                -65.5275,
                -9.7847
              ]
            },
            "responsible": "ANA",
            "flowRate": null,
            "lastUpdate": "2021-12-21T13:15:00.000Z"
          },
          {
            "rain": 326.6,
            "level": 2141.52,
            "code": "14990000",
            "name": "Manaus",
            "location": {
              "type": "Point",
              "coordinates": [
                -60.0272,
                -3.1383
              ]
            },
            "responsible": "ANA",
            "flowRate": null,
            "lastUpdate": "2021-12-21T02:45:00.000Z"
          },
        ],
        "pages": 10
      }
    ```
    ```javascript
      {
      "values": [
        {
          "code": "12700000",
          "name": "Santos Dumont",
          "location": {
            "type": "Point",
            "coordinates": [
              -68.2461,
              -6.4403
            ]
          },
          "responsible": "ANA",
          "network": "RQA",
          "lastUpdate": "2021-06-18T20:00:00.000Z",
          "observations": [
            {
              "key": "turbidity",
              "value": 207.33
            },
            {
              "key": "ph",
              "value": 7.83
            },
            {
              "key": "od",
              "value": 5.77
            },
            {
              "key": "electricConductivity",
              "value": null
            },
            {
              "key": "sampleTemperature",
              "value": 28.62
            },
            {
              "key": "totalDissolvedSolid",
              "value": null
            },
            {
              "key": "totalNitrogen",
              "value": null
            },
            {
              "key": "totalOrtophosphate",
              "value": null
            },
            {
              "key": "totalSuspensionSolid",
              "value": null
            }
          ]
        },
        ],
        "pages": 10
      }
    ```
  - **Código:** 500 <br />
    **Conteúdo:**
    ```javascript
    {
      message: "Internal Server Error";
    }
    ```

## **Filtro de estações**

Retorna um array com os objetos que estão disponíveis no banco para cada categoria.

- **URL:**

  /api/station/filter/:filterTerm

- **Método:**

  `GET`

- **Parâmetros na URL:**

  **Obrigatórios:**

  filterTerm:[string] - Termo a ser pesquisado

- **Parâmetros do Body:**

  Nenhum

- **Exemplo:**

  /api/station/filter/a

- **Resposta:**

  - **Código:** 200 <br />
    **Conteúdo:**
    ```javascript
    [
      {
        value: "ALDEIA DO CHAPÉU",
        type: "name",
      },
      {
        value: "Almeirim",
        type: "name",
      },
      {
        value: "Atalaya Aval",
        type: "name",
      },
      {
        value: "ASSIS BRASIL",
        type: "name",
      },
      {
        value: "Aval Riberalta",
        type: "name",
      },
      {
        value: "ABUNÃ",
        type: "name",
      },
      {
        value: "Aguaricó",
        type: "name",
      },
      {
        value: "AUTAZES",
        type: "name",
      },
      {
        value: "ACANAUI",
        type: "name",
      },
      {
        value: "ANA",
        type: "responsible",
      },
      {
        value: "adoptedLevel",
        type: "variable",
        namePT: "Nível",
        nameEN: "Adopted Level",
        nameES: "Nivel",
      },
    ];
    ```
  - **Código:** 500 <br />
    **Conteúdo:**
    ```javascript
    {
      message: "Internal Server Error";
    }
    ```

**Ultima atualização geral**

Retorna um objeto com a ultima atualização geral.

- **URL:**

  /api/observation/lastUpdate

- **Método:**

  `GET`

- **Parâmetros na URL:**

  **Obrigatórios:**

  Nenhum

- **Parâmetros do Body:**

  Nenhum

- **Exemplo:**

  /api/observation/lastUpdate

- **Resposta:**

  - **Código:** 200 <br />
    **Conteúdo:**
    ```javascript
        {
          "lastUpdate": "2022-01-31T19:44:21.746Z"
        }
    ```
  - **Código:** 500 <br />
    **Conteúdo:**
    ```javascript
    {
      message: "Internal Server Error";
    }
    ```

**Shape das estações**

Método que retorna as notificações da situação de cada estação.

- **URL:**

  /api/station/notification

- **Método:**

  `POST`

- **Parâmetros na URL:**

  **Obrigatórios:**
  Nenhum

  **Não Obrigatórios:**

  page?:[number] - Número da pagina de registros a ser retornada. Default: 1.
  pageSize?:[number] - Número de elementos por página. Default: 5.

- **Parâmetros do Body:**

  ```javascript
    {
      "filters": {
        "name": [], // Nome da estação
        "network": [], // Tipo de rede (RQA, RHA ou HYBAM)
        "country": [], // País
        "responsible": [], // Órgão responsável
        "river": [], // Rio
        "variable": [] // Variáveis que a estação possui medição
      }
    }
  ```

- **Exemplo:**

  /api/station/notification

- **Resposta:**

  - **Código:** 200 <br />
    **Conteúdo:**
    ```javascript
      {
      "values": [
        {
          "code": "14620000",
          "name": "Boa Vista",
          "location": {
            "type": "Point",
            "coordinates": [
              -60.6561,
              2.8267
            ]
          },
          "situation": "attention",
          "type": "flowRate",
          "value": 1796.44,
          "network": "RHA"
        },
        ...
      ],
      "pages": 11,
      "total": 53
    }
    ```
  - **Código:** 500 <br />
    **Conteúdo:**
    ```javascript
    {
      message: "Internal Server Error";
    }
    ```

## **Shape das estações**

Método que retorna o shape das estações projetadas.

- **URL:**

  /api/station/projected/location

- **Método:**

  `GET`

- **Parâmetros na URL:**

  **Obrigatórios:**
  Nenhum

  **Não Obrigatórios:**

  Nenhum

- **Parâmetros do Body:**

  Nenhum

- **Exemplo:**

  /api/station/location

- **Resposta:**

  - **Código:** 200 <br />
    **Conteúdo:**

    ```javascript
        {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -65.504917769,
              -10.604771325
            ]
          },
          "properties": {
            "name": null,
            "country": "Bolivia",
            "responsible": null,
            "network": "RHA"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -69.233376551,
              -12.510808748
            ]
          },
          "properties": {
            "name": null,
            "country": "Peru",
            "responsible": null,
            "network": "RHA"
          }
        },...
        ]
        }
    ```

  - **Código:** 500 <br />
    **Conteúdo:**
    ```javascript
    {
      message: "Internal Server Error";
    }
    ```
