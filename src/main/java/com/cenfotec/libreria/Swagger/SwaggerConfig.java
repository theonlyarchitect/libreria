package com.cenfotec.libreria.Swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket apiDocket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.cenfotec.libreria.Controller"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(getApiInfo())
                ;
    }

    private ApiInfo getApiInfo() {
        return new ApiInfo(
                "Documentation de API PARA DESARROLLO EXPRESS",
                "Soy brutalmente vago y odio ver el código por lo que uso swagger para el rápido desarrollo",
                "0.1",
                "http://codmind.com/terms",
                new Contact("Carlos Israel Morales Rojas", "https://theredempaire.com", "cmorales@ucenfotec.ac.cr"),
                "NO - LICENSE",
                "NO WHERE.COM",
                Collections.emptyList()
        );
    }
}