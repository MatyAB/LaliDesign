package LaliDesign.com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendContactEmail(String name, String email, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo("matybelay123@gmail.com"); // Your receiving email
        mailMessage.setSubject("Contact Form: " + subject);
        mailMessage.setText("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message);
        mailMessage.setReplyTo(email);
        mailSender.send(mailMessage);
    }
}
