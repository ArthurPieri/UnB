# Media salarial de homens e mulheres
# Media salarial por posicao
# Frequencia relativa (percentual) de posicao por sexo
# Separar base treino e base teste - funcao sample()
# Especificar um model (quais variaveis) - funcao lm()
# Calcular erro quadratico medio na base de teste

# Puxando a base de dados
dados <- read.table('https://raw.githubusercontent.com/Cayan-Portela/cursoR/master/salario.txt', header = T)

# Separando o salario
salario <- dados$Salario

# Separando o Salario entre homens e mulheres
Homens <- subset(dados, Sexo=="Masculino")
Mulheres <- subset(dados, Sexo=="Feminino")

mean(Homens$Salario)
#144.1103

mean(Mulheres$Salario)
#140.4667

mean(dados$Salario)

# Separando a media dos salarios por posicao
tapply(dados$Salario, dados$Posicao, FUN = 'mean')
#	 1  	  2 	   3	    4        5	      6	       7 	8
# 120.0000 123.6667 130.7297 135.8611 144.0250 148.9500 154.7429 156.2308
# 	 9
# 162.6000

# Criando a frequencia a cada Posicao na base
freqHomens <- table(Homens$Posicao)
freqMulheres <- table(Mulheres$Posicao)

# Calculando a soma das frequencias para gerar a frequencia relativa
somaFreqHomens <- sum(freqHomens)
somaFreqMulheres <- sum(freqMulheres)

# Calculando a frequencia relativa
freqHomens <- (freqHomens/somaFreqHomens) * 100
freqMulheres <- (freqMulheres/somaFreqMulheres) * 100

# Gerando os IDs da Amostra para treino
# O Treino utiliza 75% da base e o teste os outros 25 
treinoSalario <- sample(x = dados$Salario, size = 165, replace = TRUE)

# Criando as bases de Treino e Teste
dados_treino <- dados[treinoSalario, ]
dados_test <- dados[-treinoSalario, ]

# Criando o modelo
modelo <- lm(Salario ~ Posicao + Sexo + Exp, data = dados_treino)

# Criando a previsao
predict(modelo, dados_test)

# Verifica o valor previsto
modelos$fitted.values[10]
# Verifica o valor real
dados_treino$Salario[10]
# Verifica o 'E'
modelo$residuals[10]

