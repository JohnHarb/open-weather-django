from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from mysite.models import zips, users
import json

class Home(View):
	def get(self, request):
		return render(request,"home.html",{})
    
class Zip(View):
  def get(self, request):
    return render(request,"home.html",{})
  def post(self, request):
    zip = request.POST.get("zip",None)
    username = request.POST.get("username",None) 
    if zip == "0":
      if username:
        thisUser = users(username=username)
        if len(users.objects.filter(username=username)) > 0:
          thisUser=users.objects.filter(username=username)[0]
        thisUser.save()  
    else:
      if username:
        thisUser = users(username=username)
        if len(users.objects.filter(username=username)) > 0:
          thisUser=users.objects.filter(username=username)[0]
        thisZip = zips(zipcode=zip)
        if len(zips.objects.filter(zipcode=zip)) > 0:
          thisZip=zips.objects.filter(zipcode=zip)[0]
        thisUser.save()
        thisZip.us = thisUser
        thisZip.save()
    ret = zips.objects.filter(us=username).values()
    print(list(ret))
    return JsonResponse(json.dumps(list(ret)),safe=False)
  