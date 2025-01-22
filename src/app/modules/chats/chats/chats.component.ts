import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as SockJS from 'sockjs-client';
import {selectUserLogin} from "../../auth/store/auth.selectors";
import {AppState} from "../../../store/app.reducer";
import {MyMessage} from "../../core/models/chats.model";
import {Stomp} from "@stomp/stompjs";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit, OnDestroy {
  title = 'app';

  private stompClient: any;
  message = '';
  messages: MyMessage[] = [];
  username?: string;

  localStream!: MediaStream;
  remoteStream!: MediaStream;
  peerConnection!: RTCPeerConnection;
  dataChannel: any;
  socket: any;

  private servers = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectUserLogin).subscribe((login) => {
      if (login) {
        this.username = login;
        this.initializeMediaStream();
        this.initializeWebSocketConnection();
        this.subscribeTopic();
        this.createOffer();
      }
    });
  }

  ngOnDestroy() {
    this.stompClient.send(
      '/app/chat',
      {},
      JSON.stringify({ message: 'someone left' }),
    );
    console.log('niszcy');
  }

  initializeWebSocketConnection() {
    this.socket = new SockJS('http://localhost:8080/ws-chat');
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.send('/app/chat', {}, 'New user joined');
    });
  }

  async subscribeTopic() {
    this.stompClient.subscribe('/topic/messages', (message: any) => {
      const parsedMessage = JSON.parse(message.body);
      if (parsedMessage.type === 'message') {
        const msg: MyMessage = {
          message: parsedMessage.message,
          username: parsedMessage.username,
        };
        this.messages.push(msg);
      }
      if (parsedMessage.username != this.username) {
        if (parsedMessage.type === 'offer') {
          this.createAnswer(parsedMessage.offer);
        }
        if (parsedMessage.type === 'answer') {
          console.log('answer');
          this.addAnswer(parsedMessage.answer);
        }
        if (parsedMessage.type === 'candidate') {
          if (this.peerConnection) {
            console.log('candidate');
            this.peerConnection.addIceCandidate(parsedMessage.candidate);
          }
        }
      }
    });
  }

  async initializeMediaStream() {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    const user1VideoElement = document.getElementById(
      'user-1',
    ) as HTMLVideoElement;
    user1VideoElement.srcObject = this.localStream;
  }

  async createPeerConnection() {
    this.peerConnection = new RTCPeerConnection(this.servers);
    this.remoteStream = new MediaStream();
    const user2VideoElement = document.getElementById(
      'user-2',
    ) as HTMLVideoElement;
    user2VideoElement.srcObject = this.remoteStream;

    this.localStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    this.peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        this.remoteStream.addTrack(track);
      });
    };

    this.peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        this.stompClient.send(
          '/app/chat',
          {},
          JSON.stringify({
            type: 'candidate',
            candidate: event.candidate,
            username: this.username,
          }),
        );
      }
    };
  }

  async createOffer() {
    await this.subscribeTopic();
    await this.createPeerConnection();
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    this.stompClient.send(
      '/app/chat',
      {},
      JSON.stringify({ type: 'offer', offer: offer, username: this.username }),
    );
  }

  async createAnswer(offer: any) {
    await this.createPeerConnection();
    await this.peerConnection.setRemoteDescription(offer);
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    this.stompClient.send(
      '/app/chat',
      {},
      JSON.stringify({
        type: 'answer',
        answer: answer,
        username: this.username,
      }),
    );
  }

  addAnswer(answer: any) {
    if (!this.peerConnection.currentRemoteDescription) {
      this.peerConnection.setRemoteDescription(answer);
    }
  }

  sendMessage() {
    this.stompClient.send(
      '/app/chat',
      {},
      JSON.stringify({
        type: 'message',
        username: this.username,
        message: this.message,
      }),
    );
    this.message = '';
  }

  handleUserJoined() {
    console.log('user Joined');
  }

  setUsername() {
    console.log(this.username);
  }
}
