# Ora-redes API

**Contagem de estações**
----
Método que retorna o total de estações.

* **URL:**

	/api/station/count

* **Método:**

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum
		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/station/count

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
            {
            "count": 3233
            }
	  ```
	* **Código:** 500 <br />
	  **Conteúdo:**
	  ```javascript
		{
			message: 'Internal Server Error'
		}
	  ```

**Contagem de estações por tipo**
----
Método que retorna a contagem total de estações pelo tipo.

* **URL:**

	/station/count/type

* **Método:**

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum
		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/station/count/type

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
			{
			"fluviometricCount": "1417",
			"pluviometricCount": "1816"
			}
	  ```
	* **Código:** 500 <br />
	  **Conteúdo:**
	  ```javascript
		{
			message: 'Internal Server Error'
		}
	  ```

**Contagem de estações por país**
----
Método que retorna a contagem total de estações por país.

* **URL:**

	/api/station/count/country

* **Método:**

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Não Obrigatórios:**

	Nenhum
		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/station/count/country

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
			[
        {
          "country": "Bolívia",
          "count": 203
        },
        {
          "country": "Brasil",
          "count": 194
        },
        {
          "country": "Colômbia",
          "count": 37
        },
        {
          "country": "Equador",
          "count": 16
        },
        {
          "country": "Peru",
          "count": 444
        },
        {
          "country": "Venezuela",
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

**Contagem de estações por subbacia**
----
Método que retorna a contagem total de estações por subbacia.

* **URL:**

	/api/station/count/subwatershed

* **Método:**

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Não Obrigatórios:**

		page:[number] - Número da pagina de registros a ser retornada, em cada página ecistem 5 registros.
		order:[string] - Ordem da contagem('asc' ou 'desc')
		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/station/count/subwatershed?page=1&order=desc

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
			{
			"x": [
				"15 - RIO AMAZONAS,MADEIRA,GUAPORÉ,...",
				"10 - RIO SOLIMÕES, JAVARI,ITACUAI",
				"17 - RIO AMAZONAS,TAPAJÓS,JURUENA..",
				"14 - RIO SOLIMÕES,NEGRO,BRANCO,....",
				"18 - RIO AMAZONAS,,XINGÚ,IRIRI,PARU"
			],
			"series": [
				{
				"id": "station",
				"data": [
					867,
					474,
					467,
					301,
					294,
					254,
					186,
					159,
					139,
					91,
					1
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
			"pages": 3
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

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Não Obrigatórios:**

		page:[number] - Número da pagina de registros a ser retornada, em cada página ecistem 5 registros.
		order:[string] - Ordem da contagem('asc' ou 'desc')
		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/station/count/responsible?page=1&order=asc

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
			{
			"x": [
				"UFAC",
				"CEPLAC",
				"APROVALE",
				"CERR",
				"CEBEL"
			],
			"series": [
				{
				"id": "station",
				"data": [
					1,
					1,
					1,
					1,
					1
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
			"pages": 23
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

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Não Obrigatórios:**
		networkType:[string] - Tipo de estação a ser retornada. "RQA" para Rede Amazônica de Monitoramento de QA e "RHA" para Rede Hidrológica Amazônica. Para que todas as estações sejam retornadas a propriedade não deve ser enviada
		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/station/shape

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
				-58.6833,
				-1.0333
				]
			},
			"properties": {
				"name": "KATUEMA",
				"subwatershed": "16 - RIO AMAZONAS,TROMBETAS,OUTROS",
				"river": null,
				"city": "URUCARÁ",
				"country": "Brasil",
				"responsible": "ANA",
				"operator": "ANA",
				"type": "Pluviométrica"
			}
			},...
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

	/api/observation/timeSeries/:stationCode/:dataType

* **Método:**

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
	
    stationCode:[number] - Código da estação
    
    dataType:[number] - Tipo de dado (rain, flowRate, adoptedLevel)

		
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

# Ora-hidricos API

**Área de superfície d'agua**
----
Método que retorna a área total de superfície d'agua.

* **URL:**

	/api/water/area

* **Método:**

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Opcionais:**
		
		country:[string] - País sobre o qual se deseja obter informações, caso esse parâmetro não seja informado, será retornada a área de todos os países juntos
		year:[number] - Ano sobre o qual se deseja obter informações
		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/water/area?country=Brasil&year=2020

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
			{
			"count": 7707474.6
			}
	  ```
	* **Código:** 500 <br />
	  **Conteúdo:**
	  ```javascript
		{
			message: 'Internal Server Error'
		}
	  ```

**Série de superfície d'agua por ano**
----
Método que retorna a área total de superfície d'agua por ano em um país.

* **URL:**

	/api/water/series

* **Método:**

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Opcionais:**
		
	Nenhum
		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/water/series

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
		{
		"x": [
			1984,
			1985,
			1986,
			1987,
			1988,
			1989,
			1990,
			1991,
			1992,
			...
		],
		"series": [
			{
			"id": "Brasil",
			"data": [
				116309.25,
				148140.38,
				270006.13,
				194197.53,
				231518.94,
				216977.89,
				248530.48,
				249187.21,
				165780.73,
				193065,
			...
			]
			}
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

**Ranking de variação da superfície d'agua**
----
Método que retorna um ranking com a difereça entre os anos especificados da superfície d'agua em cada país'.

* **URL:**

	/api/water/variance/ranking/:initialYear/:finalYear

* **Método:**

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
		initialYear:[number] - Ano inicial para a filtragen
		finalYear:[number] - Ano final para a filtragen

	**Opcionais:**
		

		order?:[number] - Ordem do ranking
		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/water/variance/ranking/1984/2020

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
			{
			"x": [
				"Bolívia",
				"Guiana",
				"Venezuela",
				"Equador",
				"Colômbia",
				"Peru",
				"Brasil"
			],
			"series": [
				{
				"id": "station",
				"data": [
					-15149.05,
					8310.34,
					12784.68,
					74638.45,
					178161.65,
					527437.82,
					1516129.94
				]
				}
			],
			"position": [
				1,
				2,
				3,
				4,
				5,
				6,
				7
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

**Área da bacia amazônica**
----
Método que retorna a área total da bacia amazônica.

* **URL:**

	/api/water/amazonic/area

* **Método:**

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Opcionais:**
		
		country:[string] - País sobre o qual se deseja obter informações, caso esse parâmetro não seja informado, será retornada a área de todos os países juntos
		year:[number] - Ano sobre o qual se deseja obter informações
		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/water/amazonic/area

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
			{
			"count": 7707474.6
			}
	  ```
	* **Código:** 500 <br />
	  **Conteúdo:**
	  ```javascript
		{
			message: 'Internal Server Error'
		}
	  ```

**Área da bacia amazônica por país**
----
Método que retorna a área total da bacia amazônica por país.

* **URL:**

	/api/water/area/country

* **Método:**

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Opcionais:**
		
		year:[number] - Ano sobre o qual se deseja obter informações
		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/water/area/country

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
		[
		{
			"id": "Colômbia",
			"y": 340799.13
		},
		{
			"id": "Guiana",
			"y": 12336.53
		},
		{
			"id": "Venezuela",
			"y": 52279.32
		},
		{
			"id": "Peru",
			"y": 961677.29
		},
		{
			"id": "Equador",
			"y": 130509.95
		},
		{
			"id": "Brasil",
			"y": 3703566.36
		},
		{
			"id": "Bolívia",
			"y": 714723.63
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

**Ultima atualização por estação**
----
Método que retorna a última atualização para cada estação

* **URL:**

	/api/observation/last

* **Método:**

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Opcionais:**
		
		page:[number] - Número da página a ser retornada
		pageSize:[number] - Número de registros por página
		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/observation/last?page=2pageSize

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
			[
			{
				"name": "ARIQUEMES",
				"type": "Fluviométrica",
				"rain": 0,
				"flowRate": null,
				"code": 15430000,
				"level": 91,
				"timestamp": "2021-10-08T04:45:00.000Z"
			},
			{
				"name": "ARUMÃ - JUSANTE",
				"type": "Fluviométrica",
				"rain": 0,
				"flowRate": null,
				"code": 13962000,
				"level": null,
				"timestamp": "2021-10-07T02:45:00.000Z"
			},
			{
				"name": "ASSIS BRASIL",
				"type": "Fluviométrica",
				"rain": 0,
				"flowRate": null,
				"code": 13450000,
				"level": 133,
				"timestamp": "2021-10-07T02:00:00.000Z"
			},
			{
				"name": "ASSIS BRASIL - CPRM",
				"type": "Fluviométrica",
				"rain": 0,
				"flowRate": null,
				"code": 13450010,
				"level": null,
				"timestamp": "2017-12-16T12:15:00.000Z"
			},
			{
				"name": "BARCELOS",
				"type": "Fluviométrica",
				"rain": 0,
				"flowRate": null,
				"code": 14480002,
				"level": null,
				"timestamp": "2021-10-07T07:45:00.000Z"
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