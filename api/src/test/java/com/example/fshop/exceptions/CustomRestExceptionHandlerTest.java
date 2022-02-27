package com.example.fshop.exceptions;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import static org.junit.jupiter.api.Assertions.assertEquals;

@AutoConfigureMockMvc
public class CustomRestExceptionHandlerTest {

    private static final String URL_PREFIX = "http://localhost:8080";

    // TODO: MissingServletRequestParameterException test
    // TODO: ConstraintViolationException test
    // TODO: MethodArgumentTypeMismatchException test
    // TODO: INTERNAL_SERVER_ERRORException test

    @Test
    void shouldReturnUnsupportedMediaTypeWhenThrownHttpMediaTypeNotSupportedException() {
        final String contentData = "{"
                + "\"firstName\": \"Airton\","
                + "\"lastName\" : \"Santos\","
                + "\"email\": \"asouzaemail.com\","
                + "\"address\":\"Rua das Laranjeiras 12\","
                + "\"password\":\"senhasenha\","
                + "\"roles\": ["
                + "\"CLIENT\""
                + "]"
                + "}";

        String expectedErrorDescription = "Content type 'text/plain;charset=ISO-8859-1' not supported. Supported media types are application/json, application/*+json";

        Response response = RestAssured.given()
                .body(contentData)
                .post(URL_PREFIX + "/api/auth/signup");

        assertEquals(415, response.getStatusCode());
        assertEquals("Unsupported Media Type", response.jsonPath().getString("message"));
        assertEquals(expectedErrorDescription, response.jsonPath().getString("errors[0]"));
    }

    @Test
    void shouldReturnBadRequestWhenThrownMethodArgumentNotValidException() {
        final String contentData = "{"
                + "\"firstName\": \"Airton\","
                + "\"lastName\" : \"Santos\","
                + "\"email\": \"asouzaemail.com\","
                + "\"address\":\"Rua das Laranjeiras 12\","
                + "\"password\":\"senhasenha\","
                + "\"roles\": ["
                + "\"CLIENT\""
                + "]"
                + "}";

        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .body(contentData)
                .post(URL_PREFIX + "/api/auth/signup");

        assertEquals(400, response.getStatusCode());
        assertEquals("Bad Request", response.jsonPath().getString("message"));
        assertEquals("email: must be a well-formed email address",
                response.jsonPath().getString("errors[0]"));
    }

    @Test
    void shouldReturnNotFoundWhenThrownNoHandlerFoundException() {
        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .get(URL_PREFIX + "/api/auth/dontexist");

        assertEquals(404, response.getStatusCode());
        assertEquals("Not Found", response.jsonPath().getString("message"));
        assertEquals("No handler found for GET /api/auth/dontexist",
                response.jsonPath().getString("errors[0]"));
    }

    @Test
    void shouldReturnMethodNotAllowedWhenThrownHttpRequestMethodNotSupportedException() {
        final String contentData = "{"
                + "\"firstName\": \"Airton\","
                + "\"lastName\" : \"Santos\","
                + "\"email\": \"asouzaemail.com\","
                + "\"address\":\"Rua das Laranjeiras 12\","
                + "\"password\":\"senhasenha\","
                + "\"roles\": ["
                + "\"CLIENT\""
                + "]"
                + "}";

        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .body(contentData)
                .get(URL_PREFIX + "/api/auth/signup");

        assertEquals(405, response.getStatusCode());
        assertEquals("Method Not Allowed", response.jsonPath().getString("message"));
        assertEquals("GET method is not supported for this request.",
                response.jsonPath().getString("errors[0]"));
    }

}

