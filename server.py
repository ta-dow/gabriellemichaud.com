#!/usr/bin/env python3

from flask import Flask, request, redirect, render_template
app = Flask(
    __name__,
    static_url_path='/static',
    static_folder='static',
    template_folder='templates',
)

@app.route('/')
def index():
    return redirect("/index.html")

@app.route('/favicon.ico')
def favicon():
    return redirect("/static/favicon.ico")

@app.route('/<name>')
@app.route('/<name>.html')
def page(name=None):
    return render_template(f'{name.lower()}.html')


@app.route('/contact/form', methods=['GET', 'POST'])
def contact_form():
    if request.method == 'GET':
        # User is asking for the form, send the empty form
        return render_template('contact_form.html')

    elif request.method == 'POST':
        # User is submitting the form
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')
        errors = []

        # Check for missing fields or fields that are too short
        if not name or len(name) < 2:
            errors.append('You must fill in your name so I know who you are.')
        if not email or len(email) < 2:
            errors.append('You must fill in your email so I can respond to your message.')
        if not subject or len(subject) < 2:
            errors.append('Your message must have a subject.')
        if not message or len(message) < 5:
            errors.append('You must type a message longer than 5 characters.')

        if errors:
            # Form is invalid, return a response showing their errors
            return render_template(
                'contact_form.html',
                details='<br/>'.join(errors),
                name=name,
                email=email,
                subject=subject,
                message=message,
            )
        else:
            # Form is valid, send the email and show sucess message
            
            # TODO: actually send the contact email to gaby
            # send_email(
            #   to='gabriellevmichaud@icloud.com',
            #   from=email,
            #   subject=f'Website Contact: {subject}',
            #   message=message,
            # )

            success_message = (
                'Message sent to Gaby!\n'
                f'  Name: {name}\n'
                f'  Email: {email}\n'
                f'  Subject: {subject}\n'
                f'  Message:\n{message}'
            )
            print(success_message)

            return render_template(
                'contact_form.html',
                details='Message sucessfully sent to Gaby.<br/><br/>Thanks for reaching out!',
                success=1,
            )

if __name__ == '__main__':
    app.run(debug=True)