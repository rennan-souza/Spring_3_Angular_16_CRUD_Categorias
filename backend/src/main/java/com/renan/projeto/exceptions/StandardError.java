package com.renan.projeto.exceptions;

import java.io.Serializable;

public class StandardError implements Serializable {

    private static final long serialVersionUID = 1L;

    private String message;


    public StandardError() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
