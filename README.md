# Ora-agua API

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

	/station/count/type

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

		page:[number] - Número da pagina de registros a ser retornada, em cada página ecistem 5 registros.
		order:[string] - Ordem da contagem('asc' ou 'desc')
		
* **Parâmetros do Body:**

	Nenhum

* **Exemplo:**

	/api/station/count/country?page=1&order=asc

* **Resposta:**

	* **Código:** 200 <br />
	  **Conteúdo:**
	  ```javascript
			{
			"x": [
				"Venezuela",
				"Equador",
				"Colômbia",
				"Peru",
				"Bolívia"
			],
			"series": [
				{
				"id": "station",
				"data": [
					5,
					168,
					201,
					311,
					330,
					2202
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
			"pages": 2
			}
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

	Nenhum
		
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