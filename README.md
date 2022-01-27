# Ora-redes API

**Contagem de estações**
----
Método que retorna o total de estações.

* **URL:**

	/api/station/count

* **Método:**

	`POST`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum
		
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

* **Exemplo:**

	/api/station/count

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
      {
        "count": 896
      }
	  ```
	* **Código:** 500 <br />
	  **Conteúdo:**
	  ```javascript
      {
        "message": 'Internal Server Error'
      }
	  ```

**Contagem de estações por país**
----
Método que retorna a contagem total de estações por país.

* **URL:**

	/api/station/count/country

* **Método:**

	`POST`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Não Obrigatórios:**

	output?:[string] - Formato de saída (permitidos: csv ou json).
		
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

* **Exemplo:**

	/api/station/count/country

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
			[
        {
          "country": "Bolívia",
          "countryId": 6,
          "count": 203
        },
        {
          "country": "Brasil",
          "countryId": 9,
          "count": 194
        },
        {
          "country": "Colômbia",
          "countryId": 7,
          "count": 37
        },
        {
          "country": "Equador",
          "countryId": 4,
          "count": 16
        },
        {
          "country": "Peru",
          "countryId": 5,
          "count": 444
        },
        {
          "country": "Venezuela",
          "countryId": 8,
          "count": 2
        }
      ]
	  ```
	* **Código:** 500 <br />
	  **Conteúdo:**
	  ```javascript
		{
			message: 'Internal Server Error'
		}
	  ```

**Contagem de estações por rede**
----
Método que retorna a contagem total de estações por rede.

* **URL:**

	/api/station/count/network

* **Método:**

	`POST`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Não Obrigatórios:**

	output?:[string] - Formato de saída (permitidos: csv ou json).

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
		
* **Exemplo:**

	/api/station/count/network

* **Resposta:**

	* **Código:** 200 <br />
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
	* **Código:** 500 <br />
	  **Conteúdo:**
	  ```javascript
		{
			message: 'Internal Server Error'
		}
	  ```

**Contagem de estações por responsável**
----
Método que retorna a contagem total de estações por responsável.

* **URL:**

	/api/station/count/responsible

* **Método:**

	`POST`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Não Obrigatórios:**

	output?:[string] - Formato de saída (permitidos: csv ou json).

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
		
* **Exemplo:**

	/api/station/count/responsible

* **Resposta:**

	* **Código:** 200 <br />
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
	* **Código:** 500 <br />
	  **Conteúdo:**
	  ```javascript
		{
			message: 'Internal Server Error'
		}
	  ```

**Ranking de Rios por quantidade de estações**
----
Método que retorna a um ranking dos rios por quantidade de estações.

* **URL:**

	/api/station/ranking/river

* **Método:**

	`POST`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Não Obrigatórios:**

	page:[number] - Número da pagina de registros a ser retornada, cada página contém 5 registros.

	order:[string] - Ordenação dos elementos ('asc' ou 'desc')

  output?:[string] - Formato de saída (permitidos: csv ou json).

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
		
* **Exemplo:**

	/api/station/ranking/river?order=desc&page=1

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
      {
        "x": [
          null,
          "Madeira",
          "Rio Maranon",
          "Rio Solimoes",
          "Rio Napo"
        ],
        "series": [
          {
            "id": "station",
            "data": [
              718,
              21,
              11,
              7,
              6
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
        "pages": 16
      }
	  ```
	* **Código:** 500 <br />
	  **Conteúdo:**
	  ```javascript
		{
			message: 'Internal Server Error'
		}
	  ```

**Shape das estações**
----
Método que retorna o shape das estações.

* **URL:**

	/api/station/shape

* **Método:**

	`POST`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Não Obrigatórios:**
	
  network[string] - Tipo de rede a ser retornada. ["RHA", "RQA" , "HYBAM"]

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

* **Exemplo:**

	/api/station/location?network=RHA

* **Resposta:**

	* **Código:** 200 <br />
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
	* **Código:** 500 <br />
	  **Conteúdo:**
	  ```javascript
		{
			message: 'Internal Server Error'
		}
	  ```

**Série Temporal de Observações de uma Estação**
----
Uma série temporal de observações (chuva, vazão ou nível) de uma determinada estação.

* **URL:**

	/api/observation/timeSeries/:stationCode/:dataType/:fequency

* **Método:**

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
	
    stationCode:[number] - Código da estação
    
    dataType:[string] - Tipo de dado (rain, flowRate, adoptedLevel)

    frequency:[string] - Frequência dos dados (hour, day, week, month, trimester, semester, year)

		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/observation/timeSeries/351004/rain

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
      {
        "x": [
          "2015-12-22",
          "2015-12-23",
          "2016-01-01",
          "2016-01-02",
          "2016-01-03"
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
	* **Código:** 500 <br />
	  **Conteúdo:**
	  ```javascript
		{
			message: 'Internal Server Error'
		}
	  ```

**Listagem de Estações**
----
Listagem de estações da rede hidrológica.

* **URL:**

	/api/observation/last/:fequency

* **Método:**

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**

    frequency:[string] - Frequência dos dados (hour, day, week, month, trimester, semester, year)

		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/observation/last/day

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
      {
        "values": [
          {
            "location": {
              "type": "Point",
              "coordinates": [
                -65.5275,
                -9.7847
              ]
            },
            "name": "MORADA NOVA - JUSANTE",
            "rain": 0,
            "flowRate": null,
            "code": 15326000,
            "level": null,
            "timestamp": "2021-12-21T13:15:00.000Z"
          },
          {
            "location": {
              "type": "Point",
              "coordinates": [
                -68.9119,
                -3.4569
              ]
            },
            "name": "SÃO PAULO DE OLIVENÇA",
            "rain": 0,
            "flowRate": null,
            "code": 11400000,
            "level": null,
            "timestamp": "2021-12-21T02:45:00.000Z"
          }
        ],
        "pages": 10
      }
	  ```
	* **Código:** 500 <br />
	  **Conteúdo:**
	  ```javascript
		{
			message: 'Internal Server Error'
		}
	  ```

**Filtro de estações**
----
Retorna um array com os objetos que estão disponíveis no banco para cada categoria.

* **URL:**

	/api/station/filter/:filterTerm

* **Método:**

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
	
    filterTerm:[string] - Termo a ser pesquisado

		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/station/filter/a

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
			[
				{
					"value": "ALDEIA DO CHAPÉU",
					"type": "name"
				},
				{
					"value": "Almeirim",
					"type": "name"
				},
				{
					"value": "Atalaya Aval",
					"type": "name"
				},
				{
					"value": "ASSIS BRASIL",
					"type": "name"
				},
				{
					"value": "Aval Riberalta",
					"type": "name"
				},
				{
					"value": "ABUNÃ",
					"type": "name"
				},
				{
					"value": "Aguaricó",
					"type": "name"
				},
				{
					"value": "AUTAZES",
					"type": "name"
				},
				{
					"value": "ACANAUI",
					"type": "name"
				},
				{
					"value": "ANA",
					"type": "responsible"
				}
			]
	  ```
	* **Código:** 500 <br />
	  **Conteúdo:**
	  ```javascript
		{
			message: 'Internal Server Error'
		}
	  ```