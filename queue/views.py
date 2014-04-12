from django.shortcuts import render
from twilio.twiml import Response
from django.views.generic import View
from django.http import HttpResponse
from django_twilio.decorators import twilio_view
from twilio.twiml import Response
# Create your views here.
from django.views.decorators.csrf import csrf_exempt

def sms(request):
    name = request.POST.get('Body', '')
    msg = 'Hey %s, how are you today?' % (name)
    r = Response()
    r.message(msg)
    return r
