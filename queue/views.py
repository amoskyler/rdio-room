from django.shortcuts import render
from twilio.twiml import Response
from django.views.generic import View
from django.http import HttpResponse
from django_twilio.decorators import twilio_view
from twilio.twiml import Response
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
class Queue(View):

    @twilio_view
    def get(self, request):

        r = Response()
        r.message('Hello from your Django app!')
        return r
