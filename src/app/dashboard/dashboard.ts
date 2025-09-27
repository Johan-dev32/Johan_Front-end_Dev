import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

interface Usuario {
  id: number;
  nombre: string;
  avatar: string;   
  email: string;
}

interface Publicacion {
  id: number;
  usuario: Usuario;  
  contenido: string;
  imagen?: string;   
  fecha: Date;
  likes: number;
  comentarios: string[];
  categoria: string;
  NuevoComentario?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  seccionActiva: string = 'deportes';
  usuarioActual!: Usuario;
  publicaciones: Publicacion[] = [];
  nuevaPublicacion: string = '';
  nuevoComentario: { [key: number]: string } = {};
  imagenSeleccionada: string | null = null;
  publicacionSeleccionada: Publicacion | null = null;

  constructor(private router: Router) {
    
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { usuario?: Usuario };

    if (state?.usuario) {
      this.usuarioActual = state.usuario;
    } else {
      
      this.usuarioActual = {
        id: 0,
        nombre: 'Invitado',
        avatar: '',
        email: 'invitado@correo.com'
      };
    }

    // publicaciones iniciales
    this.publicaciones = [
      {
        id: 1,
        usuario: { id: 1, nombre: 'Juan Pérez', avatar: 'https://tse1.mm.bing.net/th/id/OIP.O7C6zj74BSyiIP3YjfsVRAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', email: 'juan@mail.com' },
        contenido: 'Gran partido de fútbol ayer en la Champions ⚽🔥',
        imagen: 'https://source.unsplash.com/600x400/?football',
        fecha: new Date(),
        likes: 0,
        comentarios: ['¡Totalmente de acuerdo!', 'Fue increíble el gol.'],
        categoria: 'deportes'
      },
      {
        id: 2,
        usuario: { id: 2, nombre: 'María López', avatar: 'https://tse1.mm.bing.net/th/id/OIP.O7C6zj74BSyiIP3YjfsVRAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', email: 'maria@mail.com' },
        contenido: 'Nueva actualización de Angular lanzada 🚀',
        imagen: 'https://source.unsplash.com/600x400/?technology',
        fecha: new Date(),
        likes: 0,
        comentarios: ['¡Ya quiero probarla!', 'Se ve muy buena.'],
        categoria: 'tecnologia'
      }
    ];
  }

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }

  publicacionesFiltradas() {
    return this.publicaciones.filter(p => p.categoria === this.seccionActiva);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagenSeleccionada = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  agregarPublicacion() {
    if (this.nuevaPublicacion.trim() || this.imagenSeleccionada) {
      this.publicaciones.unshift({
        id: Date.now(),
        usuario: this.usuarioActual, 
        contenido: this.nuevaPublicacion,
        imagen: this.imagenSeleccionada ?? 'https://tse1.mm.bing.net/th/id/OIP.O7C6zj74BSyiIP3YjfsVRAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
        fecha: new Date(),
        likes: 0,
        comentarios: [],
        categoria: this.seccionActiva
      });
      this.nuevaPublicacion = '';
      this.imagenSeleccionada = null;
    }
  }

  darLike(pub: Publicacion) {
    pub.likes++;
  }

  agregarComentario(pub: Publicacion) {
    const texto = this.nuevoComentario[pub.id]?.trim();
    if (texto) {
      pub.comentarios.push(texto);
      this.nuevoComentario[pub.id] = '';
    }
  }

  abrirDetalles(pub: Publicacion) {
    this.publicacionSeleccionada = pub;
  }

  cerrarDetalles() {
    this.publicacionSeleccionada = null;
  }
}