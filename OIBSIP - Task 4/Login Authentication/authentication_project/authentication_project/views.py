# from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import UserRegistrationForm

@login_required
def home(request):
    return render(request, 'index.html', {'user': request.user})


def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            # user = User.objects.create_user(
            #     username=form.cleaned_data['username'],
            #     email=form.cleaned_data['email'],
            #     password=form.cleaned_data['password1']
            # )
            user = form.save(commit=False)
            # user.set_password(form.cleaned_data['password1'])  # Hash the password
            user.save()
            messages.success(request, "Registration successful!")
            return redirect('login')
    else:
        form = UserRegistrationForm()
    return render(request, 'registration/register.html', {'form': form})


# def login_view(request):
#     if request.method == 'POST':
#         form = UserLoginForm(request.POST)
#         if form.is_valid():
#             username = form.cleaned_data['username']
#             password = form.cleaned_data['password']
#             user = authenticate(username=username, password=password)
#             if user is not None:
#                 login(request, user)
#                 messages.success(request, "Login successful!")
#                 return redirect('home')
#             else:
#                 messages.error(request, "Invalid username or password.")
#     else:
#         form = UserLoginForm()
#     return render(request, 'accounts/login.html', {'form': form})

