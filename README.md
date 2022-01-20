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

		page:[number] - Número da pagina de registros a ser retornada, cada página contém 5 registros.
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

	Nenhum
		
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

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Não Obrigatórios:**

	page:[number] - Número da pagina de registros a ser retornada, cada página contém 5 registros.

	order:[string] - Ordenação dos elementos ('asc' ou 'desc')
		
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

	`GET`
	
* **Parâmetros na URL:**

	**Obrigatórios:**
		
	Nenhum

	**Não Obrigatórios:**
	
  Nenhum

* **Exemplo:**

	/api/station/location

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
                -71.57258,
                -14.02781
              ]
            },
            "properties": {
              "code": "114046",
              "name": "POMACANCHI",
              "type": "M",
              "river": null,
              "responsible": "senhami",
              "country": "Peru",
              "countryId": 5
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