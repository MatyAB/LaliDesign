package LaliDesign.com.controller;

import LaliDesign.com.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public String sendContact(
        @RequestParam String name,
        @RequestParam String email,
        @RequestParam String subject,
        @RequestParam String message
    ) {
        emailService.sendContactEmail(name, email, subject, message);
        return "Message sent successfully!";
    }
}
