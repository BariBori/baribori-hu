<?php
// Check for empty fields
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "No arguments Provided!";
   return false;
   }
   
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$message = strip_tags(htmlspecialchars($_POST['message']));

// Build POST request to get the reCAPTCHA v3 score from Google
$recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
$recaptcha_secret = '6LemecwZAAAAAL2CKoG21ovqRxE4OX4Z8FYrOKGT'; // Insert your secret key here
$recaptcha_response = $_POST['recaptcha_response'];
 
// Make the POST request
$recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);

$recaptcha = json_decode($recaptcha);
// Take action based on the score returned
if ($recaptcha->success == true && $recaptcha->score >= 0.5 && $recaptcha->action == 'contact') {
   // This is a human. Insert the message into database OR send a mail
   $success_output = "Your message sent successfully";
} else {
   // Score less than 0.5 indicates suspicious activity. Return an error
   $error_output = "Something went wrong. Please try again later";
}


   
// Create the email and send the message
$to = 'info@baribori.hu'; // Add your email address in between the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address \n\nMessage: $message";
$headers = "From: noreply@baribori.hu\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";   
mail($to,$email_subject,$email_body,$headers);
return true;   





?>