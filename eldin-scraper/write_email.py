import smtplib
from login import FROM_ADDR
from login import TO_ADDR
from email.message import EmailMessage

def alert_failure(exception):
    msg = EmailMessage()
    msg.set_content("An automatic update has failed with the following exception:\n\n{}".format(repr(exception)))
    msg['Subject'] = 'Alert: Eldin Portal Automatic Update Failure'
    msg['From'] = FROM_ADDR
    msg['To'] = TO_ADDR
    s = smtplib.SMTP('localhost')
    s.sendmail(FROM_ADDR, [TO_ADDR], msg.as_string())
    s.quit()