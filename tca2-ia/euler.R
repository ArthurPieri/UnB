# Soma de todos os numeros multiplos de 3 e 5 menores do que 1000

seq <- 1:999
mult_3 <- seq[seq %% 3 == 0]
mult_5 <- seq[seq %% 5 == 0]

uniao <- union(mult_3, mult_5)
sum(uniao)

##############
data(iris)

table(iris$Species)

# Fazer uma regressao logistica para predizer 
# se a especie da planta e setosa

id_treino <- sample(1:150, 120)

iris$nova_coluna <- ifelse(iris$Species == "setosa",
                            yes = 1 , 
                            no = 0)

dados_treino <- iris[ id_treino , ]
dados_teste <- iris[ -id_treino , ]

mod1 <- glm(nova_coluna ~ Sepal.Length + Sepal.Width + Petal.Length + Petal.Width,
        family = binomial,
        maxit = 100,
        data = dados_treino)

round( mod1$fitted.values, 5)

tapply(dados_treino$Petal.Length, 
        dados_treino$nova_coluna,
        summary)
