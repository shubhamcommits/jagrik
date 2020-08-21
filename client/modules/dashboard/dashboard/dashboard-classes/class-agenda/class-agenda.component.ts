import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { ClassService } from '../../shared/services/class.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
declare var $: any;
require('src/assets/jquery.sha1.js');
@Component({
  selector: 'app-class-agenda',
  templateUrl: './class-agenda.component.html',
  styleUrls: ['./class-agenda.component.scss'],
})
export class ClassAgendaComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private utilityService: UtilityService,
    private classService: ClassService,
    private httpClient: HttpClient
  ) {}
  @Output() public getResonseData = new EventEmitter<string>();
  inputForm: FormGroup;
  userData: any = [];
  urlArray: any = {};
  allMeetings: any = [];

  ngOnInit(): void {
    this.userData = this.storageService.getLocalData('userData');
    if (
      this.storageService.existData('new') &&
      this.storageService.getLocalData('new') == 'yes'
    ) {
      this.storageService.setLocalData('new', 'no');
      window.location.reload();
    }
    this.getClassDetails();
    var self = this;
    $(document).ready(
      function () {
        var $configXML =
          '<?xml version="1.0" encoding="UTF-8"?> \
<config> \
  <localeversion suppressWarning="false">0.8</localeversion> \
  <version>4084-2013-01-30</version> \
  <help url="http://192.168.0.172/help.html"/> \
  <porttest host="192.168.0.172" application="video" timeout="10000"/> \
  <application uri="rtmp://192.168.0.172/bigbluebutton" host="http://192.168.0.172/bigbluebutton/api/enter" /> \
  <language userSelectionEnabled="true" /> \
  <skinning enabled="true" url="http://192.168.0.172/client/branding/css/BBBDefault.css.swf" /> \
  <layout showLogButton="false" showVideoLayout="false" showResetLayout="true" defaultLayout="Default" showToolbar="true" showFooter="true" showHelpButton="true" showLogoutWindow="true"/> \
  <modules> \
    <module name="ChatModule" url="http://192.168.0.172/client/ChatModule.swf?v=4084" uri="rtmp://192.168.0.172/bigbluebutton" dependsOn="ViewersModule" translationOn="false" translationEnabled="false" privateEnabled="true"  position="top-right"/> \
    <module name="ViewersModule" url="http://192.168.0.172/client/ViewersModule.swf?v=4084" uri="rtmp://192.168.0.172/bigbluebutton" host="http://192.168.0.172/bigbluebutton/api/enter" allowKickUser="false" /> \
    <module name="ListenersModule" url="http://192.168.0.172/client/ListenersModule.swf?v=4084" uri="rtmp://192.168.0.172/bigbluebutton" recordingHost="http://192.168.0.172" position="bottom-left" /> \
    <module name="DeskShareModule" url="http://192.168.0.172/client/DeskShareModule.swf?v=4084" uri="rtmp://192.168.0.172/deskShare" autoStart="false" /> \
    <module name="PhoneModule" url="http://192.168.0.172/client/PhoneModule.swf?v=4084" uri="rtmp://192.168.0.172/sip" autoJoin="true" skipCheck="false" showButton="true" enabledEchoCancel="true" dependsOn="ViewersModule" /> \
    <module name="VideoconfModule" url="http://192.168.0.172/client/VideoconfModule.swf?v=4084" uri="rtmp://192.168.0.172/video" dependson = "ViewersModule" videoQuality = "100" presenterShareOnly = "false" controlsForPresenter = "false" resolutions = "320x240,640x480,1280x720" autoStart = "false" showButton = "true" showCloseButton = "true" publishWindowVisible = "true" viewerWindowMaxed = "false" viewerWindowLocation = "top" camKeyFrameInterval = "30" camModeFps = "10" camQualityBandwidth = "0" camQualityPicture = "90" smoothVideo="false" applyConvolutionFilter="false" convolutionFilter="-1, 0, -1, 0, 6, 0, -1, 0, -1" filterBias="0" filterDivisor="4" enableH264 = "true" h264Level = "2.1" h264Profile = "main" displayAvatar = "false" /> \
    <module name="WhiteboardModule" url="http://192.168.0.172/client/WhiteboardModule.swf?v=4084" uri="rtmp://192.168.0.172/bigbluebutton" dependsOn="PresentModule" /> \
    <module name="PresentModule" url="http://192.168.0.172/client/PresentModule.swf?v=4084" uri="rtmp://192.168.0.172/bigbluebutton" host="http://192.168.0.172" showPresentWindow="true" showWindowControls="true" dependsOn="ViewersModule" /> \
    <module name="VideodockModule" url="http://192.168.0.172/client/VideodockModule.swf?v=4084" uri="rtmp://192.168.0.172/bigbluebutton" dependsOn="VideoconfModule, ViewersModule" autoDock="true" showControls="true" maximizeWindow="false" position="bottom-right" width="172" height="179" layout="smart" oneAlwaysBigger="false" /> \
    <module name="LayoutModule" url="http://192.168.0.172/client/LayoutModule.swf?v=4084" uri="rtmp://192.168.0.172/bigbluebutton" layoutConfig="http://192.168.0.172/client/conf/layout.xml" enableEdit="true" /> \
  </modules> \
</config>';

        $configXML =
          '<?xml version="1.0" encoding="UTF-8"?>\
<config>\
<localeversion suppressWarning="false">0.8</localeversion>\
<version>4084-2013-01-30</version>\
<help url="http://192.168.0.172/help.html"/>\
<porttest host="192.168.0.172" application="video" timeout="10000"/>\
<application uri="rtmp://192.168.0.172/bigbluebutton" host="http://192.168.0.172/bigbluebutton/api/enter"/>\
<language userSelectionEnabled="true"/>\
<skinning enabled="true" url="http://192.168.0.172/client/branding/css/BBBDefault.css.swf"/>\
<layout showLogButton="false" showVideoLayout="false" showResetLayout="true" defaultLayout="Default" showToolbar="true" showFooter="true" showHelpButton="true" showLogoutWindow="true"/>\
<modules>\
<module name="ViewersModule" url="http://192.168.0.172/client/ViewersModule.swf?v=4084" uri="rtmp://192.168.0.172/bigbluebutton" host="http://192.168.0.172/bigbluebutton/api/enter" allowKickUser="false" /> \
<module name="ListenersModule" url="http://192.168.0.172/client/ListenersModule.swf?v=4084" uri="rtmp://192.168.0.172/bigbluebutton" recordingHost="http://192.168.0.172" position="bottom-left" /> \
<module name="PhoneModule" url="http://192.168.0.172/client/PhoneModule.swf?v=4084" uri="rtmp://192.168.0.172/sip" autoJoin="true" skipCheck="false" showButton="true" enabledEchoCancel="true" dependsOn="ViewersModule" /> \
<module name="LayoutModule" url="http://192.168.0.172/client/LayoutModule.swf?v=4084" uri="rtmp://192.168.0.172/bigbluebutton" layoutConfig="http://192.168.0.172/client/conf/layout.xml" enableEdit="true" /> \
</modules>\
</config>';

        $('#reload').click(function () {
          // $('#bbb')[0].reset();
          $('#bbb :input').val('');
        });

        $('#clear').click(function () {
          $('#links_table').remove(); //if the tables already exists it removes it
          $('#bbb :input').val('');
        });

        $('#advanced').click(function () {
          //$("#advanced").remove();
          //$("#buttons").append('<button type="button" id="hide">Hide Options</button>');
          $('#advanced_form').remove(); //if the tables already exists it removes it
          $('#advanced_div').append('<table id="advanced_form"></table>');
          $('#advanced_form').append(
            '<tr><td id="field">Welcome Message </td><td><input type="text"  size="60" id="welcomeMessage" value=""/></td><td>( %%CONFNAME%%, %%DIALNUM%%, %%CONFNUM%% ) </td></tr>'
          );
          $('#advanced_form').append(
            '<tr><td id="field">Logout URL</td><td><input type="text"  size="60" id="logoutURL" value=""/></td></tr>'
          );
          $('#advanced_form').append(
            '<tr><td id="field">Maximum Participants</td><td><input type="text"  size="60" id="maxParticipants" value=""/></td></tr>'
          );
          $('#advanced_form').append(
            '<tr><td id="field">Voice Bridge</td><td><input type="text"  size="60" id="voiceBridge" value=""/></td><td>( Usually a 5 digit number, and begins with 7 if using FreeSwitch ) </td></tr>'
          );
          $('#advanced_form').append(
            '<tr><td id="field">Dial in Number</td><td><input type="text"  size="60" id="dialNumber" value=""/></td></tr>'
          );
          $('#advanced_form').append(
            '<tr><td id="field">Meta Description</td><td><input type="text"  size="60" id="meta_description" value=""/></td></tr>'
          );
          $('#advanced_form').append(
            '<tr><td id="field">Meta Test</td><td><input type="text"  size="60" id="meta_test" value=""/></td></tr>'
          );
          $('#advanced_form').append(
            '<tr><td id="field">RecordID</td><td><input type="text"  size="60" id="recordID" value=""/></td></tr>'
          );
          $('#advanced_form').append(
            '<tr><td id="field">Layout tokenID</td><td><input type="text"  size="60" id="tokenID" value=""/></td></tr>'
          );
        });

        $('#hide').click(function () {
          //$("#hide").remove();
          //$("#buttons").append('<button type="button" id="advanced">Advanced Options</button>');
          $('#advanced_form').remove(); //if the tables already exists it removes it
        });

        $('#submit').click(function () {
          //Gets the variables
          var $server = 'https://golearn.webinargolearn.org/bigbluebutton/api/';
          var $salt = 'kQ3eMjzk08iGHgUBmG2zBZjq5o7JbU5Of10CYIDRg';
          var $title = $('#title').val();
          var $description = $('#description').val();
          var $date = $('#date').val();
          var $time = $('#time').val();
          var $meetingID = $.URLEncode($('#meetingID').val());
          var $meetingName = $.URLEncode($('#meetingName').val());
          var $moderatorPW = $.URLEncode($('#moderatorPW').val());
          var $attendeePW = $.URLEncode($('#attendeePW').val());
          var $userName = $.URLEncode($('#userName').val());
          var $userID = $.URLEncode($('#userID').val());
          if (
            $meetingID == '' ||
            $title == '' ||
            $description == '' ||
            $date == '' ||
            $time == '' ||
            $meetingName == '' ||
            $moderatorPW == '' ||
            $attendeePW == ''
          ) {
            alert('All fields are requuired');
            return false;
          }
          if ($('#advanced_form').length) {
            var $welcome = $.URLEncode($('#welcomeMessage').val());
            var $logoutURL = $.URLEncode($('#logoutURL').val());
            var $maxParticipants = $.URLEncode($('#maxParticipants').val());
            var $voiceBridge = $.URLEncode($('#voiceBridge').val());
            var $dialNumber = $.URLEncode($('#dialNumber').val());
            var $meta_test = $.URLEncode($('#meta_test').val());
            var $meta_description = $.URLEncode($('#meta_description').val());
            var $recordID = $.URLEncode($('#recordID').val());
            var $tokenID = $.URLEncode($('#tokenID').val());

            //Creates the URLs
            var $params =
              'name=' +
              $meetingName +
              '&meetingID=' +
              $meetingID +
              '&moderatorPW=' +
              $moderatorPW +
              '&attendeePW=' +
              $attendeePW +
              '&welcome=' +
              $welcome;
            $params +=
              '&logoutURL=' +
              $logoutURL +
              '&maxParticipants=' +
              $maxParticipants +
              '&voiceBridge=' +
              $voiceBridge +
              '&dialNumber=' +
              $dialNumber +
              '&meta_test=' +
              $meta_test +
              '&meta_description=' +
              $meta_description;
            var $createURL =
              $server +
              'create?' +
              $params +
              '&checksum=' +
              $.sha1('create' + $params + $salt);

            $params =
              'name=' +
              $meetingName +
              '&meetingID=' +
              $meetingID +
              '&moderatorPW=' +
              $moderatorPW +
              '&attendeePW=' +
              $attendeePW +
              '&welcome=' +
              $welcome;
            $params +=
              '&logoutURL=' +
              $logoutURL +
              '&maxParticipants=' +
              $maxParticipants +
              '&voiceBridge=' +
              $voiceBridge +
              '&dialNumber=' +
              $dialNumber +
              '&meta_test=' +
              $meta_test +
              '&meta_description=' +
              $meta_description +
              '&record=true';
            var $createURLwithRecording =
              $server +
              'create?' +
              $params +
              '&checksum=' +
              $.sha1('create' + $params + $salt);

            $params = 'recordID=' + $recordID + '&publish=true';
            var $publishRecordingsURL =
              $server +
              'publishRecordings?' +
              $params +
              '&checksum=' +
              $.sha1('getRecordings' + $params + $salt);

            $params = 'recordID=' + $recordID + '&publish=false';
            var $unpublishRecordingsURL =
              $server +
              'publishRecordings?' +
              $params +
              '&checksum=' +
              $.sha1('getRecordings' + $params + $salt);

            $params = 'recordID=' + $recordID;
            var $deleteRecordingsURL =
              $server +
              'deleteRecordings?' +
              $params +
              '&checksum=' +
              $.sha1('getRecordings' + $params + $salt);

            $params =
              'meetingID=' +
              $meetingID +
              '&password=' +
              $moderatorPW +
              '&fullName=' +
              $userName +
              '&userID=' +
              $userID +
              '&configToken=' +
              $tokenID;
            var $joinModeratorURL =
              $server +
              'join?' +
              $params +
              '&checksum=' +
              $.sha1('join' + $params + $salt);

            $params =
              'meetingID=' +
              $meetingID +
              '&password=' +
              $attendeePW +
              '&fullName=' +
              $userName +
              '&userID=' +
              $userID +
              '&configToken=' +
              $tokenID;
            var $joinAttendeeURL =
              $server +
              'join?' +
              $params +
              '&checksum=' +
              $.sha1('join' + $params + $salt);
          } else {
            //Creates the URLs
            var $params =
              'name=' +
              $meetingName +
              '&meetingID=' +
              $meetingID +
              '&moderatorPW=' +
              $moderatorPW +
              '&attendeePW=' +
              $attendeePW;
            var $createURL =
              $server +
              'create?' +
              $params +
              '&checksum=' +
              $.sha1('create' + $params + $salt);

            $params =
              'name=' +
              $meetingName +
              '&meetingID=' +
              $meetingID +
              '&moderatorPW=' +
              $moderatorPW +
              '&attendeePW=' +
              $attendeePW +
              '&record=true';
            var $createURLwithRecording =
              $server +
              'create?' +
              $params +
              '&checksum=' +
              $.sha1('create' + $params + $salt);

            $params =
              'meetingID=' +
              $meetingID +
              '&password=' +
              $moderatorPW +
              '&fullName=' +
              $userName +
              '&userID=' +
              $userID;
            var $joinModeratorURL =
              $server +
              'join?' +
              $params +
              '&checksum=' +
              $.sha1('join' + $params + $salt);

            $params =
              'meetingID=' +
              $meetingID +
              '&password=' +
              $attendeePW +
              '&fullName=' +
              $userName +
              '&userID=' +
              $userID;
            var $joinAttendeeURL =
              $server +
              'join?' +
              $params +
              '&checksum=' +
              $.sha1('join' + $params + $salt);
          }

          $params = 'meetingID=' + $meetingID;
          var $isMeetingRunningURL =
            $server +
            'isMeetingRunning?' +
            $params +
            '&checksum=' +
            $.sha1('isMeetingRunning' + $params + $salt);

          $params = 'meetingID=' + $meetingID + '&password=' + $moderatorPW;
          var $getMeetingInfoURL =
            $server +
            'getMeetingInfo?' +
            $params +
            '&checksum=' +
            $.sha1('getMeetingInfo' + $params + $salt);

          $params = '';
          var $getMeetingsURL =
            $server +
            'getMeetings?' +
            $params +
            '&checksum=' +
            $.sha1('getMeetings' + $params + $salt);

          $params = 'meetingID=' + $meetingID + '&password=' + $moderatorPW;
          var $endURL =
            $server +
            'end?' +
            $params +
            '&checksum=' +
            $.sha1('end' + $params + $salt);

          $params = 'meetingID=' + $meetingID;
          var $getRecordingsURL =
            $server +
            'getRecordings?' +
            $params +
            '&checksum=' +
            $.sha1('getRecordings' + $params + $salt);

          $params = 'meetingID=';
          var $getAllRecordingsURL =
            $server +
            'getRecordings?' +
            $params +
            '&checksum=' +
            $.sha1('getRecordings' + $params + $salt);

          //$configXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><config></config>";
          $params =
            'meetingID=' + $meetingID + '&configXML=' + $.URLEncode($configXML);
          //var $getSetConfigXMLURL = $server + "setConfigXML?" + $params + "&checksum=" + $.sha1( $meetingID + $configXML + $salt);
          var $getSetConfigXMLURL =
            $server +
            'setConfigXML?' +
            $params +
            '&checksum=' +
            $.sha1(
              decodeURIComponent($meetingID) +
                decodeURIComponent($configXML) +
                $salt
            );
          console.debug('meetingID: [' + decodeURIComponent($meetingID) + ']');
          console.debug('configXML: [' + decodeURIComponent($configXML) + ']');

          var wnd = window.open($createURL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
          setTimeout(function () {
            wnd.close();
          }, 3000);
          self.urlArray = {}
          self.urlArray['create'] = $createURL;

          self.urlArray['title'] = $title;
          self.urlArray['date'] = $date;
          self.urlArray['time'] = $time;

          self.urlArray['description'] = $description;

          self.urlArray['create_rec'] = $createURLwithRecording;

          self.urlArray['join_moderate'] = $joinModeratorURL;

          self.urlArray['join_attende'] = $joinAttendeeURL;

          self.urlArray['is_meeting_running'] = $isMeetingRunningURL;

          self.urlArray['get_meeting_info'] = $getMeetingInfoURL;

          self.urlArray['get_meeting_url'] = $getMeetingsURL;

          self.urlArray['end_url'] = $endURL;

          self.urlArray['get_recording_url'] = $getRecordingsURL;

          self.urlArray['get_all_recording'] = $getAllRecordingsURL;

          self.scheduleMeeting();

          $('#bbb :input').val('');
        });
        var m, b;
        $.extend({
          URLEncode: function (c) {
            var o = '';
            var x = 0;
            c = c.toString();
            var r = /(^[a-zA-Z0-9_.]*)/;
            while (x < c.length) {
              var m = r.exec(c.substr(x));
              if (m != null && m.length > 1 && m[1] != '') {
                o += m[1];
                x += m[1].length;
              } else {
                if (c[x] == ' ') o += '+';
                else {
                  var d = c.charCodeAt(x);
                  var h = d.toString(16);
                  o += '%' + (h.length < 2 ? '0' : '') + h.toUpperCase();
                }
                x++;
              }
            }
            return o;
          },
          URLDecode: function (s) {
            var o = s;
            var binVal, t;
            var r = /(%[^%]{2})/;
            while ((m = r.exec(o)) != null && m.length > 1 && m[1] != '') {
              b = parseInt(m[1].substr(1), 16);
              t = String.fromCharCode(b);
              o = o.replace(m[1], t);
            }
            return o;
          },
        });
      }.bind(this)
    );
  }

  scheduleMeeting() {
    return new Promise((resolve) => {
      this.classService
        .scheduleMeeting(this.userData.classes[0], this.urlArray)
        .then((res) => {
          // Fire error toast
          this.utilityService.fireToast('success', `Your Meetiing scheduled`);
          this.getClassDetails();
        })
        .catch(() => {
          // Fire error toast
          this.utilityService.fireToast('warning', `Something went wrong`);
        });
    });
  }

  getClassDetails() {
    return new Promise((resolve) => {
      // Fetch class details
      this.classService
        .getClassDetails(this.userData.classes[0])
        .then((res) => {
          this.allMeetings = res['class'];
        })
        .catch(() => {
          // Fire error toast
          this.utilityService.fireToast('warning', `Something went wrong`);
        });
    });
  }

}
