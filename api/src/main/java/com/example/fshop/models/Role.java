package com.fshop.spring.jwt.mongodb.models;
import com.example.fshop.models.ERoles;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "roles")
public class Role {
    @Id
    private String id;
    private ERoles name;

    public Role() {
    }
    public Role(ERoles name) {
        this.name = name;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public ERoles getName() {
        return name;
    }
    public void setName(ERoles name) {
        this.name = name;
    }
}
